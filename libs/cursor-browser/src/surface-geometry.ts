import type { ICursorPosition } from '@pixel-brewery/cursor-core';

export function normalizePosition(
    bounds: DOMRect,
    clientX: number,
    clientY: number,
): ICursorPosition | undefined {
    if (!bounds.width || !bounds.height) return undefined;

    return {
        x: Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width)),
        y: Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height)),
    };
}

export function projectPosition(bounds: DOMRect, position: ICursorPosition): ICursorPosition {
    return {
        x: bounds.left + bounds.width * position.x,
        y: bounds.top + bounds.height * position.y,
    };
}

export function isVisibleElement(surface: HTMLElement, element: HTMLElement): boolean {
    if (!surface.isConnected || !surface.contains(element) || !element.getClientRects().length) {
        return false;
    }
    return element.checkVisibility?.({ visibilityProperty: true, opacityProperty: true })
        ?? element.ownerDocument.defaultView?.getComputedStyle(element).visibility === 'visible';
}

export function visiblePoint(
    view: Window,
    surface: HTMLElement,
    element: HTMLElement,
): ICursorPosition | undefined {
    if (!isVisibleElement(surface, element)) return undefined;

    const bounds = surface.getBoundingClientRect();
    const target = element.getBoundingClientRect();
    let left = Math.max(0, bounds.left, target.left);
    let top = Math.max(0, bounds.top, target.top);
    let right = Math.min(view.innerWidth, bounds.right, target.right);
    let bottom = Math.min(view.innerHeight, bounds.bottom, target.bottom);

    // Scroll containers between the target and surface can hide an otherwise in-bounds target.
    for (let parent = element.parentElement; parent && parent !== surface; parent = parent.parentElement) {
        const { overflowX, overflowY } = view.getComputedStyle(parent);
        if (overflowX === 'visible' && overflowY === 'visible') continue;

        const clip = parent.getBoundingClientRect();
        if (overflowX !== 'visible') {
            left = Math.max(left, clip.left);
            right = Math.min(right, clip.right);
        }
        if (overflowY !== 'visible') {
            top = Math.max(top, clip.top);
            bottom = Math.min(bottom, clip.bottom);
        }
    }

    if (right <= left || bottom <= top) return undefined;
    return { x: (left + right) / 2, y: (top + bottom) / 2 };
}
