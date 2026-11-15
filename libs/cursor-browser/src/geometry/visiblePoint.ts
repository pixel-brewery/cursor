// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';
import { isRenderedElement, isVisibleElement } from './isVisibleElement.js';

// #endregion

/**
 * Finds the center of the visible portion of a registered target.
 *
 * @param view - The surface window.
 * @param surface - The attached surface.
 * @param element - The target element.
 * @param composedPath - The optional path from a guided element to its surface.
 * @param layer - An open popover or modal dialog that contains the guided element.
 * @returns The viewport coordinate, or undefined when the target is clipped or hidden.
 *
 * @internal
 */
export function visiblePoint(
    view: Window,
    surface: HTMLElement,
    element: HTMLElement,
    composedPath?: readonly Element[],
    layer?: Element,
): ICursorPosition | undefined {
    if (
        composedPath
            ? !composedPath.length || !isRenderedElement(element)
            : !isVisibleElement(surface, element)
    ) {
        return undefined;
    }

    const bounds = layer ? undefined : surface.getBoundingClientRect();
    const target = element.getBoundingClientRect();
    let left = Math.max(0, bounds?.left ?? 0, target.left);
    let top = Math.max(0, bounds?.top ?? 0, target.top);
    let right = Math.min(view.innerWidth, bounds?.right ?? view.innerWidth, target.right);
    let bottom = Math.min(view.innerHeight, bounds?.bottom ?? view.innerHeight, target.bottom);

    for (const parent of clippingAncestors(surface, element, composedPath, layer)) {
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

function* clippingAncestors(
    surface: HTMLElement,
    element: HTMLElement,
    composedPath: readonly Element[] | undefined,
    layer: Element | undefined,
): Iterable<Element> {
    if (composedPath) {
        if (element === layer) return;
        for (const parent of composedPath.slice(1)) {
            if (parent === surface && parent !== layer) break;
            yield parent;
            if (parent === layer) break;
        }
        return;
    }

    for (let parent = element.parentElement; parent && parent !== surface; parent = parent.parentElement) {
        yield parent;
    }
}
