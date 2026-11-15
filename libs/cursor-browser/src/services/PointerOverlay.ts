// #region Imports

import type { IPointerMarker } from '../interfaces/IPointerMarker.js';
import type { IPointerVisual } from '../interfaces/IPointerVisual.js';
import { cursorPalette } from '../models/cursorPalette.js';
import { pointerColors } from '../models/pointerColors.js';
import { pointerStyles } from '../models/pointerStyles.js';
import { readPointerLabelColor } from '../models/readPointerLabelColor.js';

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
    private _assistantLayer: HTMLElement | undefined;
    private _style: keyof typeof pointerStyles = 'pill';

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

    /** Restyles the markers in place using the current surface attribute. */
    public setStyle(value: string | null): void {
        const style =
            value && Object.hasOwn(pointerStyles, value)
                ? (value as keyof typeof pointerStyles)
                : 'pill';
        if (style === this._style) return;

        this._style = style;
        for (const marker of this._markers.values()) this.applyStyle(marker);
    }

    /**
     * Creates or updates the marker for one participant or assistant.
     *
     * @param key - The marker key scoped to this overlay.
     * @param visual - The projected marker appearance and position.
     * @param topLayer - Whether the assistant must appear over a popover or modal dialog.
     *
     * @internal
     */
    public paint(key: string, visual: IPointerVisual, topLayer = false): void {
        let marker = this._markers.get(key);
        if (!marker) {
            marker = this.createMarker();
            this._markers.set(key, marker);
        }

        const container =
            key === 'assistant' && topLayer
                ? (this.attachAssistantLayer() ?? this._element)
                : this._element;
        if (marker.root.parentElement !== container) container.append(marker.root);
        if (key === 'assistant' && !topLayer) this.removeAssistantLayer();
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
        if (key === 'assistant') this.removeAssistantLayer();
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
        this.removeAssistantLayer();
        this._element.remove();
    }

    private attachAssistantLayer(): HTMLElement | undefined {
        if (this._assistantLayer) return this._assistantLayer;
        const layer = this._document.createElement('div');
        if (typeof layer.showPopover !== 'function') return undefined;

        layer.popover = 'manual';
        layer.inert = true;
        Object.assign(layer.style, {
            position: 'fixed',
            inset: '0',
            width: 'auto',
            height: 'auto',
            margin: '0',
            border: '0',
            padding: '0',
            background: 'transparent',
            overflow: 'hidden',
            pointerEvents: 'none',
        });
        this._element.append(layer);
        layer.showPopover();
        this._assistantLayer = layer;
        return layer;
    }

    private removeAssistantLayer(): void {
        this._assistantLayer?.remove();
        this._assistantLayer = undefined;
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
        const outline = document.createElement('span');
        const fill = document.createElement('span');
        const label = document.createElement('span');
        tip.className = 'cursor-pointer-tip';
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
        Object.assign(tip.style, { position: 'absolute', top: '0', left: '0' });
        for (const layer of [outline, fill]) {
            Object.assign(layer.style, { position: 'absolute', inset: '0' });
        }
        outline.style.backgroundColor = '#fff';
        Object.assign(label.style, {
            display: 'block',
            boxSizing: 'border-box',
            height: '30px',
            alignContent: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            font: '500 13px/16px var(--cursor-label-font-family, system-ui, sans-serif)',
            color: 'var(--cursor-label-color, var(--cursor-marker-text))',
            padding: '0 12px',
        });

        tip.append(outline, fill);
        root.append(tip, label);
        const marker = { root, tip, outline, fill, label };
        this.applyStyle(marker);
        return marker;
    }

    private applyStyle(marker: IPointerMarker): void {
        const { root, tip, outline, fill, label } = marker;
        const style = pointerStyles[this._style];
        root.dataset.cursorStyle = this._style;
        Object.assign(tip.style, {
            width: style.width,
            height: style.height,
            filter: style.shadow,
        });
        outline.hidden = style.inset === undefined;
        outline.style.clipPath = style.arrow;
        fill.style.clipPath = style.inset ?? style.arrow;
        fill.style.backgroundColor = style.tipColor;
        Object.assign(label.style, {
            margin: style.labelMargin,
            borderRadius: `var(--cursor-label-radius, ${style.labelRadius})`,
            border: style.labelBorder,
            boxShadow: style.labelShadow,
            backgroundColor:
                this._style === 'outline'
                    ? 'var(--cursor-label-background, var(--cursor-marker-light))'
                    : 'var(--cursor-label-background, var(--cursor-marker-accent))',
        });
    }

    private applyColors(marker: IPointerMarker, visual: IPointerVisual): void {
        const paletteKey = visual.color?.toLowerCase() ?? visual.kind;
        if (marker.paletteKey === paletteKey) return;

        const { style } = marker.root;
        const color =
            visual.color?.toLowerCase() ??
            (visual.kind === 'assistant' ? '#6929d9' : cursorPalette.blue);
        const palette = pointerColors.get(color);
        const hostColor = (fallback: string) =>
            visual.color ? fallback : `var(--cursor-${visual.kind}-color, ${fallback})`;
        style.setProperty('--cursor-marker-accent', hostColor(color));
        style.setProperty('--cursor-marker-light', hostColor(palette?.light ?? color));
        style.setProperty('--cursor-marker-border', hostColor(palette?.border ?? color));
        style.setProperty('--cursor-marker-text', palette?.text ?? readPointerLabelColor(color));
        marker.paletteKey = paletteKey;
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
        const { root, label } = marker;
        root.dataset.cursorId = visual.id;
        root.dataset.cursorKind = visual.kind;
        root.toggleAttribute('data-cursor-local', visual.local === true);
        root.toggleAttribute('data-cursor-arrived', visual.arrived === true);
        root.toggleAttribute('data-cursor-guided-element', visual.guided === true);
        if (visual.targetId === undefined) {
            delete root.dataset.cursorTarget;
        } else {
            root.dataset.cursorTarget = visual.targetId;
        }
        root.style.transform = `translate3d(${visual.position.x}px, ${visual.position.y}px, 0)`;
        this.applyColors(marker, visual);
        if (label.textContent !== visual.label) label.textContent = visual.label;
    }

    // #endregion
}
