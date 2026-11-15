import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import type { MosaikOptionSelection } from '../MosaikOptionSelection.js';

/**
 * Additional operations for a Mosaik dropdown that accepts one selected option.
 *
 * @public
 */
export interface IMosaikSingleChoiceAccess {
    /**
     * Opens a dropdown, guides the assistant to an option and activates it.
     *
     * @param surface - The active surface that already presented the dropdown.
     * @param selection - The allowed option value or next enabled option.
     * @param signal - Cancels the action before the option can be activated.
     * @returns A promise that resolves once the dropdown reports the expected selection.
     * @throws When the dropdown or option becomes unavailable or selection cannot be verified.
     */
    selectOption(
        surface: ICursorSurface,
        selection: MosaikOptionSelection,
        signal: AbortSignal,
    ): Promise<void>;
}
