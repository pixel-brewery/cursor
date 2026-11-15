// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import { useEffect } from 'react';

// #endregion

/**
 * Register a target for the current React element and attachment.
 *
 * @public
 * @param surface - The active surface returned by the surface hook.
 * @param targetId - The target identifier used by assistant commands.
 * @param element - The committed DOM element, or null until mounted.
 */
export function useCursorTarget(
    surface: ICursorSurface | null,
    targetId: string,
    element: HTMLElement | null
): void {
    useEffect(() => {
        if (surface && element?.isConnected) return surface.registerTarget(targetId, element);
    }, [surface, targetId, element]);
}
