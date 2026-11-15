/**
 * A rendered option whose selection state can be verified after activation.
 *
 * @public
 */
export interface ISelectableOption extends HTMLElement {
    /** Whether the option cannot be activated. */
    readonly disabled: boolean;

    /** Whether the control currently includes this option in its selection. */
    readonly isSelected: boolean;

    /** The option value published by the control. */
    readonly value: unknown;
}
