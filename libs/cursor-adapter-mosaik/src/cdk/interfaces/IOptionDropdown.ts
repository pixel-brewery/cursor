import type { ISelectableOption } from './ISelectableOption.js';

/**
 * The native dropdown contract used by the guided option selection action.
 *
 * @public
 */
export interface IOptionDropdown extends HTMLElement {
    /** Whether the dropdown cannot be changed. */
    readonly disabled: boolean;

    /** Whether the dropdown is open. */
    readonly isDropDownOpen: boolean;

    /** The options in display order. */
    readonly items: readonly ISelectableOption[];

    /** The current option used as the starting point for next-option navigation. */
    readonly selectedItem: ISelectableOption | null;

    /** Opens the dropdown. */
    open(): void;

    /** Requests that the dropdown close according to the control's policy. */
    close(): void;
}
