import type { ICursorSurface, ICursorSurfaceOptions } from '@pixel-brewery/cursor-browser';

/**
 * Options for attaching the Svelte surface and observing its lifetime.
 *
 * @public
 */
export interface ICursorBindingOptions extends Omit<ICursorSurfaceOptions, 'surface'> {
    readonly onAttachment: (attachment: ICursorSurface | null) => void;
}
