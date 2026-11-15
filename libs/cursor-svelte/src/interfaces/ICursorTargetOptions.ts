// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';

// #endregion

/**
 * Identifies a Svelte target and the surface that owns it.
 *
 * @public
 */
export interface ICursorTargetOptions {
    /**
     * The owning surface attachment, or null until the surface is mounted.
     */
    readonly surface: ICursorSurface | null;

    /**
     * Stable identifier used by assistant commands to find this target.
     */
    readonly targetId: string;
}
