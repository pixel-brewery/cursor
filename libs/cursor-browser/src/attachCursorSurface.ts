// #region Imports

import type { ICursorSurface } from './interfaces/ICursorSurface.js';
import type { ICursorSurfaceOptions } from './interfaces/ICursorSurfaceOptions.js';
import { CursorSurfaceBinding } from './services/CursorSurfaceBinding.js';

// #endregion

/**
 * Mounts the shared pointer renderer on a connected browser or Electron surface.
 *
 * @remarks The overlay observes the attached view without handling pointer input or taking focus
 * from host controls. The host owns the lifetime of the returned attachment and the supplied
 * controller. Dispose the attachment before a view change or unmount.
 *
 * @param options - The host surface, view controller and optional projection settings.
 * @returns An attachment that owns overlay cleanup and target registration.
 * @throws {Error} If the surface has no connected browser document with a body and a window.
 *
 * @example
 * ```ts
 * const binding = attachCursorSurface({ surface, controller });
 * const releaseSettings = binding.registerTarget('settings', settingsButton);
 * releaseSettings();
 * binding.dispose();
 * ```
 *
 * @public
 */
export function attachCursorSurface(options: ICursorSurfaceOptions): ICursorSurface {
    const binding = new CursorSurfaceBinding(options);

    binding.attach();

    return binding;
}
