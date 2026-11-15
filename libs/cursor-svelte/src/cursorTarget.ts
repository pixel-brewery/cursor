// #region Imports

import type { Action } from 'svelte/action';
import type { ICursorTargetOptions } from './ICursorTargetOptions.js';

// #endregion

/**
 * Register a rendered element as an assistant target for its Svelte action lifetime.
 *
 * @public
 */
export const cursorTarget: Action<HTMLElement, ICursorTargetOptions> = (element, options) => {
    let current = options;
    let unregister = current.surface?.registerTarget(current.targetId, element);

    return {
        update(next) {
            if (next.surface === current.surface && next.targetId === current.targetId) return;

            unregister?.();
            current = next;
            unregister = current.surface?.registerTarget(current.targetId, element);
        },
        destroy() {
            unregister?.();
        }
    };
};
