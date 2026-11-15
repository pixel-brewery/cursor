// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';

// #endregion

/**
 * Converts viewport coordinates to a point inside the attached surface.
 *
 * @param bounds - The surface bounds in CSS pixels.
 * @param clientX - Horizontal viewport position.
 * @param clientY - Vertical viewport position.
 * @returns The normalized point, or undefined for a zero-sized surface.
 *
 * @internal
 */
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
