// #region Imports

import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import type { Action } from 'svelte/action';
import type { ICursorBindingOptions } from './ICursorBindingOptions.js';

// #endregion

/**
 * Attach a surface when a Svelte action mounts and release it on destruction.
 *
 * @public
 */
export const cursorSurface: Action<HTMLElement, ICursorBindingOptions> = (element, options) => {
    let current = options;
    let attachment = attachCursorSurface({ ...current, surface: element });
    current.onAttachment(attachment);

    return {
        update(next) {
            const replacesSurface = next.controller !== current.controller ||
                Boolean(next.showLocalPointer) !== Boolean(current.showLocalPointer);
            const changesObserver = next.onAttachment !== current.onAttachment;
            if (!replacesSurface && !changesObserver) return;

            current.onAttachment(null);
            if (replacesSurface) {
                attachment.dispose();
                attachment = attachCursorSurface({ ...next, surface: element });
            }
            current = next;
            current.onAttachment(attachment);
        },
        destroy() {
            attachment.dispose();
            current.onAttachment(null);
        }
    };
};
