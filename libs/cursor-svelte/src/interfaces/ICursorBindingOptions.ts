// #region Imports

import type { ICursorSurface, ICursorSurfaceOptions } from '@pixel-brewery/cursor-browser';

// #endregion

/**
 * Options for attaching the Svelte surface and observing its lifetime.
 *
 * @remarks The local pointer stays hidden unless `showLocalPointer` is enabled.
 * Unanchored remote positions are projected unless `allowSurfaceProjection` is false.
 *
 * @public
 */
export interface ICursorBindingOptions extends Omit<ICursorSurfaceOptions, 'surface'> {
    /**
     * Receives the current attachment when observation starts and `null` when it ends.
     *
     * @param attachment - The current browser attachment or `null` during cleanup.
     */
    readonly onAttachment: (attachment: ICursorSurface | null) => void;
}
