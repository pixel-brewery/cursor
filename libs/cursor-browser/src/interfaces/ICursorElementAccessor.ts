import type { ICursorSurface } from './ICursorSurface.js';

/**
 * The common action exposed by an accessor bound to a DOM element.
 *
 * @public
 */
export interface ICursorElementAccessor {
    /**
     * Guides the cursor to the element and activates it.
     *
     * @param surface - The active cursor surface.
     * @param signal - Cancellation for this guided action.
     * @param target - An optional control inside the bound element to activate.
     * @returns A promise that resolves after activation.
     */
    activate(surface: ICursorSurface, signal: AbortSignal, target?: HTMLElement): Promise<void>;
}
