// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';

// #endregion

/**
 * Projects a normalized surface position into the current viewport.
 *
 * @param bounds - The receiving surface bounds in CSS pixels.
 * @param position - A normalized surface position.
 * @returns The viewport position in CSS pixels.
 *
 * @internal
 */
export function projectPosition(
    bounds: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
    position: ICursorPosition,
): ICursorPosition {
    return {
        x: bounds.left + bounds.width * position.x,
        y: bounds.top + bounds.height * position.y,
    };
}
