// #region Imports

import type { IPointerMarker } from '../interfaces/IPointerMarker.js';
import type { IPointerVisual } from '../interfaces/IPointerVisual.js';

// #endregion

/**
 * Owns the inert DOM overlay and its rendered pointer markers.
 *
 * @internal
 */
export class PointerOverlay {
    // #region Fields

    private readonly _element: HTMLElement;
    private readonly _markers = new Map<string, IPointerMarker>();

    // #endregion

    // #region Ctor

    /**
     * Creates an inert overlay for one browser document.
     *
     * @param _document - The window document that owns the overlay and markers.
     *
     * @internal
     */
    public constructor(private readonly _document: Document) {
        this._element = _document.createElement('div');
        this._element.setAttribute('aria-hidden', 'true');
        this._element.setAttribute('data-cursor-overlay', '');
        Object.assign(this._element.style, {
            position: 'fixed',
            inset: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 'var(--cursor-z-index, 100)',
        });
    }

    // #endregion

    // #region Properties

    /**
     * Returns the overlay element that the surface attachment mounts.
     *
     * @returns The detached or mounted overlay.
     *
     * @internal
     */
    public get element(): HTMLElement {
        return this._element;
    }

    // #endregion

    // #region Methods

    /**
     * Creates or updates the marker for one participant or assistant.
     *
     * @param key - The marker key scoped to this overlay.
     * @param visual - The projected marker appearance and position.
     *
     * @internal
     */
    public paint(key: string, visual: IPointerVisual): void {
        let marker = this._markers.get(key);
        if (!marker) {
            marker = this.createMarker();
            this._markers.set(key, marker);
            this._element.append(marker.root);
        }

        this.updateMarker(marker, visual);
    }

    /**
     * Removes a marker by its overlay key.
     *
     * @param key - The marker key to remove.
     *
     * @internal
     */
    public remove(key: string): void {
        this._markers.get(key)?.root.remove();
        this._markers.delete(key);
    }

    /**
     * Removes participant markers that no longer have a visible projection.
     *
     * @param visible - The keys of the participants that still have a visible marker.
     *
     * @internal
     */
    public removeMissingParticipants(visible: ReadonlySet<string>): void {
        for (const key of this._markers.keys()) {
            if (key !== 'assistant' && !visible.has(key)) this.remove(key);
        }
    }

    /**
     * Removes the overlay element and releases all marker references.
     *
     * @internal
     */
    public dispose(): void {
        this._markers.clear();
        this._element.remove();
    }

    /**
     * Creates the visual nodes for one pointer.
     *
     * @returns The marker root, tip and label.
     *
     * @private
     */
    private createMarker(): IPointerMarker {
        const document = this._document;
        const root = document.createElement('div');
        const tip = document.createElement('span');
        const label = document.createElement('span');
        label.className = 'cursor-pointer-label';

        Object.assign(root.style, {
            position: 'absolute',
            display: 'flex',
            top: '0',
            left: '0',
            alignItems: 'flex-start',
            maxWidth: '250px',
            pointerEvents: 'none',
        });
        Object.assign(tip.style, {
            width: '17px',
            height: '21px',
            flexShrink: '0',
            clipPath: 'polygon(0 0, 99% 52%, 61% 59%, 76% 91%, 61% 100%, 45% 69%, 23% 93%)',
        });
        Object.assign(label.style, {
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            font: '600 11px/1.2 system-ui, sans-serif',
            color: 'var(--cursor-label-color, #fff)',
            backgroundColor: 'var(--cursor-label-background, #19243a)',
            borderRadius: 'var(--cursor-label-radius, 4px)',
            padding: '3px 5px',
            margin: '11px 0 0 -1px',
        });

        root.append(tip, label);
        return { root, tip, label };
    }

    /**
     * Updates the marker for the current projection.
     *
     * @param marker - The marker nodes to update.
     * @param visual - The current projected appearance and location.
     *
     * @private
     */
    private updateMarker(marker: IPointerMarker, visual: IPointerVisual): void {
        const { root, tip, label } = marker;
        root.dataset.cursorId = visual.id;
        root.dataset.cursorKind = visual.kind;
        root.toggleAttribute('data-cursor-local', visual.local === true);
        root.toggleAttribute('data-cursor-arrived', visual.arrived === true);
        if (visual.targetId === undefined) {
            delete root.dataset.cursorTarget;
        } else {
            root.dataset.cursorTarget = visual.targetId;
        }
        root.style.transform = `translate3d(${visual.position.x}px, ${visual.position.y}px, 0)`;
        tip.style.backgroundColor =
            visual.kind === 'assistant'
                ? 'var(--cursor-assistant-color, #6929d9)'
                : 'var(--cursor-human-color, #067e77)';
        if (visual.color) tip.style.backgroundColor = visual.color;
        if (label.textContent !== visual.label) label.textContent = visual.label;
    }

    // #endregion
}
