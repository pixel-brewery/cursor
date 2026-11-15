import type {
    ICursorController,
    ICursorPosition,
    IPointer,
} from '@pixel-brewery/cursor-core';

import { PointerOverlay } from './pointer-overlay.js';
import { isVisibleElement, normalizePosition, projectPosition, visiblePoint } from './surface-geometry.js';

/**
 * Supplies the host view and its attached pointer controller.
 *
 * @public
 */
export interface ICursorSurfaceOptions {
    readonly surface: HTMLElement;
    readonly controller: ICursorController;
    readonly showLocalPointer?: boolean;
    /**
     * Allows unanchored remote positions on surfaces with comparable layouts.
     *
     * @readonly
     */
    readonly allowSurfaceProjection?: boolean;
}

/**
 * Owns the overlay and registrations for one mounted browser surface.
 *
 * @public
 */
export interface ICursorSurface {
    /**
     * Registers a live element under its stable host target ID.
     *
     * @param id - The target ID provided to the controller.
     * @param element - A rendered element within the attached surface.
     * @returns A function that releases this registration.
     */
    registerTarget(id: string, element: HTMLElement): () => void;

    /**
     * Removes the attachment and its registrations, including any active presentation.
     */
    dispose(): void;
}

interface ITarget {
    readonly element: HTMLElement;
    readonly release: () => void;
}

interface ILocalPointer {
    readonly position: ICursorPosition;
    readonly targetId?: string;
}

interface IAssistantPointer {
    readonly targetId: string;
    position: ICursorPosition;
}

const assistantDuration = 240;

function nextFrame(view: Window, signal: AbortSignal): Promise<number | undefined> {
    if (signal.aborted) return Promise.resolve(undefined);

    return new Promise((resolve) => {
        const frame = view.requestAnimationFrame((time) => {
            signal.removeEventListener('abort', cancel);
            resolve(time);
        });
        function cancel(): void {
            view.cancelAnimationFrame(frame);
            resolve(undefined);
        }
        signal.addEventListener('abort', cancel, { once: true });
    });
}

class CursorSurfaceBinding implements ICursorSurface {
    private readonly _surface: HTMLElement;
    private readonly _controller: ICursorController;
    private readonly _view: Window & typeof globalThis;
    private readonly _overlay: PointerOverlay;
    private readonly _resizeObserver: ResizeObserver;
    private readonly _mutationObserver: MutationObserver;
    private readonly _targets = new Map<string, ITarget>();
    private readonly _unsubscribe: () => void;
    private readonly _reducedMotion: MediaQueryList;
    private _pointers: readonly IPointer[];
    private _local: ILocalPointer | undefined;
    private _assistant: IAssistantPointer | undefined;
    private _animation: AbortController | undefined;
    private _publishPending = false;
    private _frame: number | undefined;
    private _disposed = false;

    constructor(private readonly _options: ICursorSurfaceOptions) {
        this._surface = _options.surface;
        this._controller = _options.controller;
        const document = this._surface.ownerDocument;
        const view = document.defaultView;
        if (!view || !document.body || !this._surface.isConnected) {
            throw new Error('The cursor surface must be connected to a browser document.');
        }

        this._view = view;
        this._overlay = new PointerOverlay(document);
        this._reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
        document.body.append(this._overlay.element);

        this._resizeObserver = new view.ResizeObserver(this._schedulePaint);
        this._resizeObserver.observe(this._surface);
        this._mutationObserver = new view.MutationObserver((records) => {
            if (records.some((record) => !this._overlay.element.contains(record.target))) {
                this._schedulePaint();
            }
        });
        this._mutationObserver.observe(this._surface, { attributes: true, childList: true, subtree: true });

        this._pointers = this._controller.getPointers();
        this._unsubscribe = this._controller.subscribe((pointers) => {
            this._pointers = pointers;
            if (!this._controller.isConnected) this.clearPointers();
            this._schedulePaint();
        });

        view.addEventListener('resize', this._schedulePaint);
        view.addEventListener('scroll', this._schedulePaint, true);
        this._surface.addEventListener('pointermove', this._move);
        this._surface.addEventListener('pointerleave', this._leave);
        this._surface.addEventListener('pointercancel', this._leave);
        this._schedulePaint();
    }

    registerTarget(id: string, element: HTMLElement): () => void {
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

    dispose(): void {
        if (this._disposed) return;
        this._disposed = true;
        this._leave();
        this._animation?.abort();
        if (this._frame !== undefined) this._view.cancelAnimationFrame(this._frame);

        this._unsubscribe();
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

    private readonly _move = (event: PointerEvent): void => {
        if (!this._controller.isConnected) return;
        const position = normalizePosition(this._surface.getBoundingClientRect(), event.clientX, event.clientY);
        if (!position) return;

        const path = event.composedPath();
        const target = [...this._targets].find(([, registration]) => path.includes(registration.element));
        this._local = target ? { position, targetId: target[0] } : { position };
        this._publishPending = true;
        this._schedulePaint();
    };

    private readonly _leave = (): void => {
        this._local = undefined;
        this._publishPending = false;
        this._controller.leave();
        this._overlay.remove('local');
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

    private paintPointers(): void {
        if (!this._controller.isConnected) return;
        const bounds = this._surface.getBoundingClientRect();
        const visible = new Set<string>();

        for (const pointer of this._pointers) {
            const target = pointer.targetId && this._targets.get(pointer.targetId);
            const anchored = target ? visiblePoint(this._view, this._surface, target.element) : undefined;
            const position = anchored
                ?? (!target && this._options.allowSurfaceProjection !== false
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
        if (!this._animation) this.paintSettledAssistant();
    }

    private isInsideViewport(position: ICursorPosition, bounds: DOMRect): boolean {
        return this._surface.isConnected && bounds.width > 0 && bounds.height > 0
            && position.x >= Math.max(0, bounds.left) && position.x < Math.min(this._view.innerWidth, bounds.right)
            && position.y >= Math.max(0, bounds.top) && position.y < Math.min(this._view.innerHeight, bounds.bottom);
    }

    private isTargetAvailable(id: string, element: HTMLElement): boolean {
        return !this._disposed && this._controller.isConnected && this._targets.get(id)?.element === element
            && isVisibleElement(this._surface, element);
    }

    private clearPointers(): void {
        this._local = undefined;
        this._publishPending = false;
        this._assistant = undefined;
        this._animation?.abort();
        this._overlay.removeMissingParticipants(new Set());
        this._overlay.remove('assistant');
    }

    private paintAssistant(pointer: IAssistantPointer, arrived: boolean): void {
        this._overlay.paint('assistant', {
            id: 'assistant',
            label: 'AI',
            kind: 'assistant',
            position: pointer.position,
            color: undefined,
            targetId: pointer.targetId,
            arrived,
        });
    }

    private paintSettledAssistant(): void {
        const pointer = this._assistant;
        const target = pointer && this._targets.get(pointer.targetId);
        const position = target && visiblePoint(this._view, this._surface, target.element);
        if (!pointer || !position) {
            this._overlay.remove('assistant');
            return;
        }

        pointer.position = position;
        this.paintAssistant(pointer, true);
    }

    private assistantOrigin(destination: ICursorPosition): ICursorPosition {
        const previous = this._assistant?.position;
        const bounds = this._surface.getBoundingClientRect();
        if (previous && this.isInsideViewport(previous, bounds)) return previous;

        return {
            x: Math.max(0, bounds.left, destination.x - 42),
            y: Math.min(destination.y + 28, this._view.innerHeight - 1, bounds.bottom - 1),
        };
    }

    private async presentTarget(id: string, element: HTMLElement, requestSignal: AbortSignal): Promise<boolean> {
        if (requestSignal.aborted || !this.isTargetAvailable(id, element)) return false;

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
                const time = await nextFrame(this._view, signal);
                if (time === undefined || !this.isTargetAvailable(id, element)) return false;
                const destination = visiblePoint(this._view, this._surface, element);
                if (!destination) return false;

                start ??= time;
                origin ??= this.assistantOrigin(destination);
                const progress = this._reducedMotion.matches ? 1 : Math.min(1, (time - start) / assistantDuration);
                const eased = 1 - (1 - progress) ** 3;
                const pointer = {
                    targetId: id,
                    position: {
                        x: origin.x + (destination.x - origin.x) * eased,
                        y: origin.y + (destination.y - origin.y) * eased,
                    },
                };

                this._assistant = pointer;
                this.paintAssistant(pointer, progress === 1);
                if (progress === 1) {
                    arrived = true;
                    return true;
                }
            }
        } finally {
            if (this._animation === animation) {
                this._animation = undefined;
                if (!arrived) {
                    this._assistant = undefined;
                    this._overlay.remove('assistant');
                }
            }
        }
    }
}

/**
 * Mounts the shared browser or Electron renderer on a live host surface.
 *
 * @public
 * @param options - The host surface, attached core controller and projection options.
 * @returns The attachment. The caller continues to own the supplied controller.
 */
export function attachCursorSurface(options: ICursorSurfaceOptions): ICursorSurface {
    return new CursorSurfaceBinding(options);
}
