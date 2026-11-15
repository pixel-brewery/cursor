// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import {
    mosaikSelectItemTag,
    mosaikSelectTag,
    type IMosaikSelectElement,
    type IMosaikSelectItemElement,
} from './generated/mosaikSelect.generated.js';
import type { MosaikOptionSelection } from './MosaikOptionSelection.js';

// #endregion

function findOption(
    select: IMosaikSelectElement,
    selection: MosaikOptionSelection,
): IMosaikSelectItemElement | undefined {
    const options = select.items;
    const isEnabled = (item: IMosaikSelectItemElement) =>
        item.localName === mosaikSelectItemTag && !item.disabled;

    if (selection.kind === 'value') {
        return options.find((item) => isEnabled(item) && item.value === selection.value);
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
 * Opens a Mosaik select and guides the assistant to the option before activating it.
 * Call from a host-authorized action registered for the select.
 *
 * @param surface - The active surface that already presented the select.
 * @param element - The mounted Mosaik select.
 * @param selection - The allowed option value or next enabled option.
 * @param signal - Cancels the action before an option can be activated.
 * @returns A promise that resolves once the select reports the expected selection.
 * @throws When the select or option becomes unavailable or the selection cannot be verified.
 * @public
 */
export async function selectMosaikOption(
    surface: ICursorSurface,
    element: HTMLElement,
    selection: MosaikOptionSelection,
    signal: AbortSignal,
): Promise<void> {
    signal.throwIfAborted();
    const view = element.ownerDocument.defaultView;
    if (element.localName !== mosaikSelectTag || !element.isConnected || !view) {
        throw new Error('A mounted Mosaik select is required.');
    }
    const select = element as IMosaikSelectElement;
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
