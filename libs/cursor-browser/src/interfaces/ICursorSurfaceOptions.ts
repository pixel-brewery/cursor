// #region Imports

import type { ICursorController } from '@pixel-brewery/cursor-core';

// #endregion

/**
 * Host view and projection options for one browser or Electron attachment.
 *
 * @public
 */
export interface ICursorSurfaceOptions {
    /**
     * Connected DOM root that receives pointer input and contains registered targets.
     * Set `data-cursor-style` on this element to `outline`, `pill`, `square` or
     * `square-outline`. The default is `pill`. The style can change while attached.
     *
     * @readonly
     */
    readonly surface: HTMLElement;

    /**
     * The host-owned controller for the attached view. Dispose the attachment when switching
     * controllers and dispose the controller according to its own lifetime.
     *
     * @readonly
     */
    readonly controller: ICursorController;

    /**
     * Whether the overlay also draws the local participant's labeled pointer. The controller
     * publishes local moves regardless of this setting.
     *
     * @defaultValue `false`
     * @readonly
     */
    readonly showLocalPointer?: boolean;

    /**
     * Whether remote moves can use normalized surface coordinates when they lack a known target.
     * Set to false when the sender and receiver use different surface layouts.
     *
     * @defaultValue `true`
     * @readonly
     */
    readonly allowSurfaceProjection?: boolean;
}
