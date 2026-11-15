import type { ICursorPosition } from '@pixel-brewery/cursor-core';

interface IPointerVisual {
    readonly id: string;
    readonly label: string;
    readonly kind: 'human' | 'assistant';
    readonly position: ICursorPosition;
    readonly color: string | undefined;
    readonly targetId: string | undefined;
    readonly local?: boolean;
    readonly arrived?: boolean;
}

interface IPointerMarker {
    readonly root: HTMLElement;
    readonly tip: HTMLElement;
    readonly label: HTMLElement;
}

function createMarker(document: Document): IPointerMarker {
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

function updateMarker(marker: IPointerMarker, visual: IPointerVisual): void {
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
    tip.style.backgroundColor = visual.kind === 'assistant'
        ? 'var(--cursor-assistant-color, #6929d9)'
        : 'var(--cursor-human-color, #067e77)';
    if (visual.color) tip.style.backgroundColor = visual.color;
    if (label.textContent !== visual.label) label.textContent = visual.label;
}

export class PointerOverlay {
    readonly element: HTMLElement;
    private readonly _markers = new Map<string, IPointerMarker>();

    constructor(private readonly _document: Document) {
        this.element = _document.createElement('div');
        this.element.setAttribute('aria-hidden', 'true');
        this.element.setAttribute('data-cursor-overlay', '');
        Object.assign(this.element.style, {
            position: 'fixed',
            inset: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 'var(--cursor-z-index, 100)',
        });
    }

    paint(key: string, visual: IPointerVisual): void {
        let marker = this._markers.get(key);
        if (!marker) {
            marker = createMarker(this._document);
            this._markers.set(key, marker);
            this.element.append(marker.root);
        }

        updateMarker(marker, visual);
    }

    remove(key: string): void {
        this._markers.get(key)?.root.remove();
        this._markers.delete(key);
    }

    removeMissingParticipants(visible: ReadonlySet<string>): void {
        for (const key of this._markers.keys()) {
            if (key !== 'assistant' && !visible.has(key)) this.remove(key);
        }
    }

    dispose(): void {
        this._markers.clear();
        this.element.remove();
    }
}
