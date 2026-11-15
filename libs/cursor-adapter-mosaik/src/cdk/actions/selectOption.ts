// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import type { IOptionDropdown } from '../interfaces/IOptionDropdown.js';
import type { ISelectableOption } from '../interfaces/ISelectableOption.js';
import type { OptionSelection } from '../OptionSelection.js';

// #endregion

function findOption(
    dropdown: IOptionDropdown,
    selection: OptionSelection,
): ISelectableOption | undefined {
    const options = dropdown.items;

    if (selection.kind === 'value') {
        return options.find((option) => !option.disabled && option.value === selection.value);
    }

    const afterSelected = dropdown.selectedItem ? options.indexOf(dropdown.selectedItem) + 1 : 0;
    const canSelect = (option: ISelectableOption) => !option.disabled && !option.isSelected;
    return options.slice(afterSelected).find(canSelect) ?? options.slice(0, afterSelected).find(canSelect);
}

async function waitUntil(
    view: Window,
    condition: () => boolean,
    signal: AbortSignal,
): Promise<void> {
    while (true) {
        signal.throwIfAborted();
        if (condition()) return;
        await new Promise<void>((resolve) => {
            const frame = view.requestAnimationFrame(() => {
                signal.removeEventListener('abort', abort);
                resolve();
            });
            function abort(): void {
                view.cancelAnimationFrame(frame);
                resolve();
            }
            signal.addEventListener('abort', abort, { once: true });
        });
    }
}

/**
 * Guides the cursor to an option and selects it through the native dropdown interaction.
 *
 * @remarks Already selected options are left selected. If this action opens the dropdown,
 * it requests closure at the end. The control retains its own selection and closing policy.
 * @param dropdown - A mounted control that exposes the option dropdown contract.
 * @param surface - The surface that guides the cursor to the option.
 * @param selection - The requested option by value or list order.
 * @param signal - Cancels the action before activation.
 * @returns A promise that resolves once the option is selected.
 * @throws If the dropdown or option is unavailable or the selection cannot be verified.
 * @public
 */
export async function selectOption(
    dropdown: IOptionDropdown,
    surface: ICursorSurface,
    selection: OptionSelection,
    signal: AbortSignal,
): Promise<void> {
    signal.throwIfAborted();
    const view = dropdown.ownerDocument.defaultView;
    if (!dropdown.isConnected || !view || dropdown.disabled) {
        throw new Error('The Mosaik dropdown is unavailable.');
    }
    const option = findOption(dropdown, selection);
    if (!option || !option.isConnected) throw new Error('The Mosaik option is unavailable.');
    if (option.isSelected) return;

    const timing = AbortSignal.any([signal, AbortSignal.timeout(2500)]);
    const openedHere = !dropdown.isDropDownOpen;
    try {
        if (openedHere) dropdown.open();
        // The opening animation can give options geometry before they become visible.
        await waitUntil(
            view,
            () =>
                dropdown.isDropDownOpen &&
                option.getClientRects().length > 0 &&
                (option.checkVisibility?.({ visibilityProperty: true, opacityProperty: true }) ?? true),
            timing,
        );
        if (!(await surface.guideTo(option, timing))) {
            timing.throwIfAborted();
            throw new Error('The Mosaik option is not visible.');
        }

        if (!view.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const earliestActivation = view.performance.now() + 120;
            await waitUntil(view, () => view.performance.now() >= earliestActivation, timing);
        }
        timing.throwIfAborted();
        if (
            !dropdown.isConnected || dropdown.disabled || !dropdown.isDropDownOpen ||
            !option.isConnected || !dropdown.items.includes(option) || option.disabled
        ) {
            throw new Error('The Mosaik option changed before activation.');
        }

        if (option.isSelected) return;
        option.click();
        await waitUntil(view, () => option.isSelected && dropdown.items.includes(option), timing);
    } finally {
        if (openedHere && dropdown.isConnected && dropdown.isDropDownOpen) dropdown.close();
    }
}
