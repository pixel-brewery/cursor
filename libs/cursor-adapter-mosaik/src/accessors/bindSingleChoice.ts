// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import type { IMosaikSingleChoiceAccess } from '../interfaces/IMosaikSingleChoiceAccess.js';
import type { MosaikOptionSelection } from '../MosaikOptionSelection.js';

// #endregion

interface IChoiceOption extends HTMLElement {
    readonly disabled: boolean;
    readonly value: unknown;
}

interface ISingleChoiceElement extends HTMLElement {
    readonly disabled: boolean;
    readonly isDropDownOpen: boolean;
    readonly items: readonly HTMLElement[];
    readonly selectedItem: HTMLElement | null;
    readonly value: string | null;
    open(): void;
    close(): void;
}

function findOption(
    select: ISingleChoiceElement,
    selection: MosaikOptionSelection,
): IChoiceOption | undefined {
    const options = select.items;
    const isEnabled = (item: HTMLElement): item is IChoiceOption =>
        'disabled' in item && item.disabled === false && 'value' in item;

    if (selection.kind === 'value') {
        return options.find((item): item is IChoiceOption =>
            isEnabled(item) && item.value === selection.value);
    }

    const afterSelected = select.selectedItem ? options.indexOf(select.selectedItem) + 1 : 0;
    return [...options.slice(afterSelected), ...options.slice(0, afterSelected)].find(isEnabled);
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
 * Extends a generated accessor with the shared single-choice interaction.
 *
 * @param element - The mounted element whose contract the generator verified.
 * @returns The guided action for that element.
 * @internal
 */
export function bindSingleChoice(element: HTMLElement): IMosaikSingleChoiceAccess {
    return {
        selectOption: (surface, selection, signal) => selectOption(element, surface, selection, signal),
    };
}

async function selectOption(
    element: HTMLElement,
    surface: ICursorSurface,
    selection: MosaikOptionSelection,
    signal: AbortSignal,
): Promise<void> {
    signal.throwIfAborted();
    const view = element.ownerDocument.defaultView;
    if (!element.isConnected || !view) {
        throw new Error('The Mosaik dropdown is unavailable.');
    }
    const select = element as ISingleChoiceElement;
    if (!Array.isArray(select.items)) throw new Error('The Mosaik dropdown is not ready.');
    const option = findOption(select, selection);
    if (select.disabled || !option) throw new Error('The Mosaik option is unavailable.');

    const timing = AbortSignal.any([signal, AbortSignal.timeout(2500)]);
    const openedHere = !select.isDropDownOpen;
    try {
        if (openedHere) select.open();
        // The opening animation can give options geometry before they become visible.
        await waitUntil(
            view,
            () =>
                select.isDropDownOpen &&
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
            !select.isConnected ||
            select.disabled ||
            !select.isDropDownOpen ||
            !option.isConnected ||
            !select.items.includes(option) ||
            option.disabled
        ) {
            throw new Error('The Mosaik option changed before activation.');
        }

        const expectedValue = option.value;
        option.click();
        await waitUntil(
            view,
            () =>
                select.selectedItem === option &&
                (typeof expectedValue !== 'string' || select.value === expectedValue) &&
                !select.isDropDownOpen,
            timing,
        );
    } finally {
        if (openedHere && select.isConnected && select.isDropDownOpen) select.close();
    }
}
