// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';
import { isVisibleElement } from './isVisibleElement.js';

// #endregion

/**
 * Finds the center of the visible portion of a registered target.
 *
 * @param view - The surface window.
 * @param surface - The attached surface.
 * @param element - The registered target.
 * @returns The viewport coordinate, or undefined when the target is clipped or hidden.
 *
 * @internal
 */
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
    for (
        let parent = element.parentElement;
        parent && parent !== surface;
        parent = parent.parentElement
    ) {
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
