// #region Imports

import type { ICursorController, ICursorPosition, IPointer } from '@pixel-brewery/cursor-core';
import { composedPathToSurface } from '../geometry/composedPathToSurface.js';
import { isRenderedElement, isVisibleElement } from '../geometry/isVisibleElement.js';
import { normalizePosition } from '../geometry/normalizePosition.js';
import { projectPosition } from '../geometry/projectPosition.js';
import { visiblePoint } from '../geometry/visiblePoint.js';
import type { IAssistantPointer } from '../interfaces/IAssistantPointer.js';
import type { ICursorSurface } from '../interfaces/ICursorSurface.js';
import type { ICursorSurfaceOptions } from '../interfaces/ICursorSurfaceOptions.js';
import type { IGuidedElement } from '../interfaces/IGuidedElement.js';
import type { ILocalPointer } from '../interfaces/ILocalPointer.js';
import type { ITarget } from '../interfaces/ITarget.js';
import { PointerOverlay } from './PointerOverlay.js';

// #endregion

/**
 * Coordinates registrations, controller subscriptions and pointer presentation for one mounted surface.
 *
 * @internal
 */
export class CursorSurfaceBinding implements ICursorSurface {
    // #region Fields

    private static readonly _assistantDuration = 240;
    private static readonly _topLayer = ':is(:popover-open, dialog:modal)';
    private readonly _surface: HTMLElement;
    private readonly _body: HTMLElement;
    private readonly _controller: ICursorController;
    private readonly _view: Window & typeof globalThis;
    private readonly _overlay: PointerOverlay;
    private readonly _resizeObserver: ResizeObserver;
    private readonly _mutationObserver: MutationObserver;
    private readonly _targets = new Map<string, ITarget>();
    private readonly _reducedMotion: MediaQueryList;
    private readonly _nativeCursorRegion: HTMLElement | null;
    private _nativeCursorStyle: { value: string; priority: string } | undefined;
    private _unsubscribe: (() => void) | undefined;
    private _pointers: readonly IPointer[];
    private _local: ILocalPointer | undefined;
    private _assistant: IAssistantPointer | undefined;
    private _guidedElement: IGuidedElement | undefined;
    private _animation: AbortController | undefined;
    private _publishPending = false;
    private _frame: number | undefined;
    private _disposed = false;

    private readonly _move = (event: PointerEvent): void => {
        if (!this._controller.isConnected) return;
        const position = normalizePosition(
            this._surface.getBoundingClientRect(),
            event.clientX,
            event.clientY,
        );
        if (!position) return;

        const path = event.composedPath();
        const target = [...this._targets].find(([, registration]) =>
            path.includes(registration.element),
        );
        this._local = target ? { position, targetId: target[0] } : { position };
        this._publishPending = true;
        this._schedulePaint();
    };

    private readonly _leave = (): void => {
        this._local = undefined;
        this._publishPending = false;
        this._controller.leave();
        this._overlay.remove('local');
        this.setNativeCursorHidden(false);
        this._schedulePaint();
    };

    private readonly _schedulePaint = (): void => {
        if (this._disposed || this._frame !== undefined) return;
        this._frame = this._view.requestAnimationFrame(() => {
            this._frame = undefined;
            if (this._publishPending && this._local) {
                this._publishPending = false;
                this._controller.move(this._local.position, this._local.targetId);
            }
            this.paintPointers();
        });
    };

    // #endregion

    // #region Ctor

    /**
     * Prepares a binding for one connected browser or Electron surface.
     *
     * @param _options - The host view, controller and projection options.
     * @throws {Error} If the surface lacks a connected document, window or body.
     *
     * @internal
     */
    public constructor(private readonly _options: ICursorSurfaceOptions) {
        this._surface = _options.surface;
        this._controller = _options.controller;
        const document = this._surface.ownerDocument;
        const view = document.defaultView;
        if (!view || !document.body || !this._surface.isConnected) {
            throw new Error('The cursor surface must be connected to a browser document.');
        }

        this._body = document.body;
        this._view = view;
        const nativeCursorSelector = '[data-cursor-hide-native]';
        this._nativeCursorRegion = this._surface.matches(nativeCursorSelector)
            ? this._surface
            : this._surface.querySelector<HTMLElement>(nativeCursorSelector);
        this._overlay = new PointerOverlay(document);
        this._reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
        this._resizeObserver = new view.ResizeObserver(this._schedulePaint);
        this._mutationObserver = new view.MutationObserver((records) => {
            if (records.some((record) => !this._overlay.element.contains(record.target))) {
                this._schedulePaint();
            }
        });
        this._pointers = this._controller.getPointers();
    }

    // #endregion

    // #region Methods

    /**
     * Mounts the overlay and subscribes its binding to view and controller changes.
     *
     * @internal
     */
    public attach(): void {
        this._body.append(this._overlay.element);
        this._resizeObserver.observe(this._surface);
        this._mutationObserver.observe(this._surface, {
            attributes: true,
            childList: true,
            subtree: true,
        });

        this._unsubscribe = this._controller.subscribe((pointers) => {
            this._pointers = pointers;
            if (!this._controller.isConnected) this.clearPointers();
            this._schedulePaint();
        });

        this._view.addEventListener('resize', this._schedulePaint);
        this._view.addEventListener('scroll', this._schedulePaint, true);
        this._surface.addEventListener('pointermove', this._move);
        this._surface.addEventListener('pointerleave', this._leave);
        this._surface.addEventListener('pointercancel', this._leave);
        this._schedulePaint();
    }

    /**
     * {@inheritDoc ICursorSurface.registerTarget}
     */
    public registerTarget(id: string, element: HTMLElement): () => void {
        if (this._disposed || !this._surface.contains(element)) {
            throw new Error('The cursor target must belong to an active surface.');
        }

        const controllerRelease = this._controller.registerTarget(
            id,
            ({ signal }) => this.presentTarget(id, element, signal),
            () => this.isTargetAvailable(id, element),
        );
        const release = (): void => {
            if (this._targets.get(id)?.release !== release) return;

            this._targets.delete(id);
            if (![...this._targets.values()].some((target) => target.element === element)) {
                this._resizeObserver.unobserve(element);
            }
            controllerRelease();
            if (this._assistant?.targetId === id) {
                if (this._guidedElement) {
                    this.stopGuiding();
                    this._animation?.abort();
                }
                this._assistant = undefined;
                this._overlay.remove('assistant');
            }
            this._schedulePaint();
        };

        this._targets.set(id, { element, release });
        this._resizeObserver.observe(element);
        this._schedulePaint();
        return release;
    }

    /** {@inheritDoc ICursorSurface.guideTo} */
    public async guideTo(element: HTMLElement, signal: AbortSignal): Promise<boolean> {
        if (signal.aborted || this._disposed || !this._controller.isConnected) return false;
        const path = composedPathToSurface(this._surface, element);
        if (!path.length || !isRenderedElement(element)) return false;

        const previous = this._guidedElement?.pointer?.position ?? this._assistant?.position;
        this.stopGuiding();
        const layer = path.find((ancestor) => ancestor.matches(CursorSurfaceBinding._topLayer));
        const targetId = this._assistant?.targetId;
        const guided: IGuidedElement = {
            element,
            layer,
            pointer: undefined,
            dispose: this.observeGuidedElement(element, path, layer, signal),
        };
        this._guidedElement = guided;

        return this.animateAssistant(
            element,
            signal,
            previous,
            () => this.guidedPoint(guided),
            (position, arrived) => {
                guided.pointer = { targetId, position };
                this.paintAssistant(guided.pointer, arrived, guided);
            },
            () => {
                this.stopGuiding();
                this.paintSettledAssistant();
            },
        );
    }

    /**
     * {@inheritDoc ICursorSurface.dispose}
     */
    public dispose(): void {
        if (this._disposed) return;
        this._disposed = true;
        this._leave();
        this.stopGuiding();
        this._animation?.abort();
        if (this._frame !== undefined) this._view.cancelAnimationFrame(this._frame);

        this._unsubscribe?.();
        this._view.removeEventListener('resize', this._schedulePaint);
        this._view.removeEventListener('scroll', this._schedulePaint, true);
        this._surface.removeEventListener('pointermove', this._move);
        this._surface.removeEventListener('pointerleave', this._leave);
        this._surface.removeEventListener('pointercancel', this._leave);
        for (const target of this._targets.values()) target.release();
        this._mutationObserver.disconnect();
        this._resizeObserver.disconnect();
        this._overlay.dispose();
    }

    private paintPointers(): void {
        if (!this._controller.isConnected) return;
        this._overlay.setStyle(this._surface.getAttribute('data-cursor-style'));
        const bounds = this._surface.getBoundingClientRect();
        const visible = new Set<string>();

        for (const pointer of this._pointers) {
            const target = pointer.targetId && this._targets.get(pointer.targetId);
            const anchored = target
                ? visiblePoint(this._view, this._surface, target.element)
                : undefined;
            const position =
                anchored ??
                (!target && this._options.allowSurfaceProjection !== false
                    ? projectPosition(bounds, pointer.position)
                    : undefined);
            if (!position || !this.isInsideViewport(position, bounds)) continue;

            const { participant } = pointer;
            const key = `remote:${participant.id}`;
            visible.add(key);
            this._overlay.paint(key, {
                id: participant.id,
                label: participant.label,
                kind: participant.source ?? 'human',
                color: participant.color,
                targetId: pointer.targetId,
                position,
            });
        }

        if (this._options.showLocalPointer && this._local) {
            const position = projectPosition(bounds, this._local.position);
            if (this.isInsideViewport(position, bounds)) {
                const participant = this._controller.participant;
                visible.add('local');
                this._overlay.paint('local', {
                    id: participant.id,
                    label: participant.label,
                    kind: participant.source ?? 'human',
                    color: participant.color,
                    targetId: this._local.targetId,
                    local: true,
                    position,
                });
            }
        }

        this._overlay.removeMissingParticipants(visible);
        this.setNativeCursorHidden(visible.has('local'));
        if (!this._animation) this.paintSettledAssistant();
    }

    private setNativeCursorHidden(hidden: boolean): void {
        const style = this._nativeCursorRegion?.style;
        if (!style || hidden === Boolean(this._nativeCursorStyle)) return;

        if (hidden) {
            this._nativeCursorStyle = {
                value: style.getPropertyValue('cursor'),
                priority: style.getPropertyPriority('cursor'),
            };
            style.setProperty('cursor', 'none', this._nativeCursorStyle.priority);
            return;
        }

        const previous = this._nativeCursorStyle;
        if (previous && style.getPropertyValue('cursor') === 'none') {
            style.setProperty('cursor', previous.value, previous.priority);
        }
        this._nativeCursorStyle = undefined;
    }

    private isInsideViewport(position: ICursorPosition, bounds: DOMRect): boolean {
        return (
            this._surface.isConnected &&
            bounds.width > 0 &&
            bounds.height > 0 &&
            position.x >= Math.max(0, bounds.left) &&
            position.x < Math.min(this._view.innerWidth, bounds.right) &&
            position.y >= Math.max(0, bounds.top) &&
            position.y < Math.min(this._view.innerHeight, bounds.bottom)
        );
    }

    private isTargetAvailable(id: string, element: HTMLElement): boolean {
        return (
            !this._disposed &&
            this._controller.isConnected &&
            this._targets.get(id)?.element === element &&
            isVisibleElement(this._surface, element)
        );
    }

    private clearPointers(): void {
        this._local = undefined;
        this._publishPending = false;
        this._assistant = undefined;
        this.stopGuiding();
        this._animation?.abort();
        this._overlay.removeMissingParticipants(new Set());
        this._overlay.remove('assistant');
        this.setNativeCursorHidden(false);
    }

    private observeGuidedElement(
        element: HTMLElement,
        path: readonly Element[],
        layer: Element | undefined,
        signal: AbortSignal,
    ): () => void {
        const listeners = new AbortController();
        const listenerOptions = { signal: listeners.signal };
        const resizeObserver = new this._view.ResizeObserver(this._schedulePaint);
        const mutationObserver = new this._view.MutationObserver(this._schedulePaint);
        resizeObserver.observe(element);
        if (layer) {
            resizeObserver.observe(layer);
            layer.addEventListener('toggle', this._schedulePaint, listenerOptions);
            layer.addEventListener('close', this._schedulePaint, listenerOptions);
        }

        const roots = new Set(path.map((ancestor) => ancestor.getRootNode()));
        for (const root of roots) {
            if (!(root instanceof this._view.ShadowRoot)) continue;
            root.addEventListener('scroll', this._schedulePaint, { ...listenerOptions, capture: true });
            mutationObserver.observe(root, { attributes: true, childList: true, subtree: true });
        }
        signal.addEventListener(
            'abort',
            () => {
                this.stopGuiding();
                this._schedulePaint();
            },
            listenerOptions,
        );

        return () => {
            listeners.abort();
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }

    private stopGuiding(): void {
        this._guidedElement?.dispose();
        this._guidedElement = undefined;
    }

    private guidedPoint(guided: IGuidedElement): ICursorPosition | undefined {
        if (this._guidedElement !== guided || !this._controller.isConnected) return undefined;
        const { element, layer } = guided;
        const path = composedPathToSurface(this._surface, element);
        if (layer && (!path.includes(layer) || !layer.matches(CursorSurfaceBinding._topLayer))) {
            return undefined;
        }
        return visiblePoint(this._view, this._surface, element, path, layer);
    }

    private paintAssistant(
        pointer: IAssistantPointer,
        arrived: boolean,
        guided?: IGuidedElement,
    ): void {
        this._overlay.paint(
            'assistant',
            {
                id: 'assistant',
                label: 'AI',
                kind: 'assistant',
                position: pointer.position,
                color: undefined,
                targetId: pointer.targetId,
                arrived,
                guided: Boolean(guided),
            },
            Boolean(guided?.layer),
        );
    }

    private paintSettledAssistant(): void {
        const guided = this._guidedElement;
        if (guided?.pointer) {
            const position = this.guidedPoint(guided);
            if (position) {
                guided.pointer.position = position;
                this.paintAssistant(guided.pointer, true, guided);
                return;
            }
            this.stopGuiding();
        }

        const pointer = this._assistant;
        const target = pointer?.targetId && this._targets.get(pointer.targetId);
        const position = target && visiblePoint(this._view, this._surface, target.element);
        if (!pointer || !position) {
            this._overlay.remove('assistant');
            return;
        }

        pointer.position = position;
        this.paintAssistant(pointer, true);
    }

    private assistantOrigin(
        destination: ICursorPosition,
        previous: ICursorPosition | undefined,
    ): ICursorPosition {
        const bounds = this._surface.getBoundingClientRect();
        if (
            previous &&
            previous.x >= 0 &&
            previous.x < this._view.innerWidth &&
            previous.y >= 0 &&
            previous.y < this._view.innerHeight
        ) {
            return previous;
        }

        return {
            x: Math.max(0, bounds.left, destination.x - 42),
            y: Math.min(destination.y + 28, this._view.innerHeight - 1, bounds.bottom - 1),
        };
    }

    private nextFrame(signal: AbortSignal): Promise<number | undefined> {
        if (signal.aborted) return Promise.resolve(undefined);

        return new Promise((resolve) => {
            const frame = this._view.requestAnimationFrame((time) => {
                signal.removeEventListener('abort', cancel);
                resolve(time);
            });
            const cancel = (): void => {
                this._view.cancelAnimationFrame(frame);
                resolve(undefined);
            };
            signal.addEventListener('abort', cancel, { once: true });
        });
    }

    private async presentTarget(
        id: string,
        element: HTMLElement,
        requestSignal: AbortSignal,
    ): Promise<boolean> {
        if (requestSignal.aborted || !this.isTargetAvailable(id, element)) return false;

        const previous = this._guidedElement?.pointer?.position ?? this._assistant?.position;
        this.stopGuiding();
        return this.animateAssistant(
            element,
            requestSignal,
            previous,
            () =>
                this.isTargetAvailable(id, element)
                    ? visiblePoint(this._view, this._surface, element)
                    : undefined,
            (position, arrived) => {
                this._assistant = { targetId: id, position };
                this.paintAssistant(this._assistant, arrived);
            },
            () => {
                this._assistant = undefined;
                this._overlay.remove('assistant');
            },
        );
    }

    private async animateAssistant(
        element: HTMLElement,
        requestSignal: AbortSignal,
        previous: ICursorPosition | undefined,
        getDestination: () => ICursorPosition | undefined,
        paint: (position: ICursorPosition, arrived: boolean) => void,
        onMiss: () => void,
    ): Promise<boolean> {
        this._animation?.abort();
        const animation = new AbortController();
        this._animation = animation;
        const signal = AbortSignal.any([requestSignal, animation.signal]);
        let arrived = false;

        try {
            element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
            let start: number | undefined;
            let origin: ICursorPosition | undefined;

            for (;;) {
                const time = await this.nextFrame(signal);
                if (time === undefined || signal.aborted) return false;
                const destination = getDestination();
                if (!destination) return false;

                start ??= time;
                origin ??= this.assistantOrigin(destination, previous);
                const progress = this._reducedMotion.matches
                    ? 1
                    : Math.min(1, (time - start) / CursorSurfaceBinding._assistantDuration);
                const eased = 1 - (1 - progress) ** 3;
                paint(
                    {
                        x: origin.x + (destination.x - origin.x) * eased,
                        y: origin.y + (destination.y - origin.y) * eased,
                    },
                    progress === 1,
                );
                if (progress === 1) {
                    arrived = true;
                    return true;
                }
            }
        } finally {
            if (this._animation === animation) {
                this._animation = undefined;
                if (!arrived) onMiss();
            }
        }
    }

    // #endregion
}
