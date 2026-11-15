import type { ICursorSurface } from '@pixel-brewery/cursor-browser';

/**
 * Identifies a Svelte target and the surface that owns it.
 *
 * @public
 */
export interface ICursorTargetOptions {
    readonly surface: ICursorSurface | null;
    readonly targetId: string;
}
