// #region Imports

import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import type { Action } from 'svelte/action';
import type { ICursorBindingOptions } from '../interfaces/ICursorBindingOptions.js';

// #endregion

/**
 * Attach the browser renderer when a Svelte action mounts.
 *
 * @remarks Changing the controller or a pointer option disposes the previous attachment.
 * Destruction releases the renderer and reports `null` through `onAttachment`.
 * Replacing the callback ends the previous observation and reports the current attachment
 * to the new observer. The host owns the controller.
 *
 * @public
 */
export const cursorSurface: Action<HTMLElement, ICursorBindingOptions> = (element, options) => {
    let current = options;
    let attachment = attachCursorSurface({ ...current, surface: element });
    current.onAttachment(attachment);

    return {
        update(next) {
            const replacesSurface =
                next.controller !== current.controller ||
                Boolean(next.showLocalPointer) !== Boolean(current.showLocalPointer) ||
                (next.allowSurfaceProjection ?? true) !== (current.allowSurfaceProjection ?? true);
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
        },
    };
};
