// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import { onMounted, onScopeDispose, toValue, watch, type MaybeRefOrGetter, type WatchHandle } from 'vue';

// #endregion

/**
 * Keep a target registered for the active Vue attachment and rendered element.
 *
 * @public
 * @param surface - The active surface returned by the surface composable.
 * @param targetId - The target identifier used by assistant commands.
 * @param element - The template ref or getter for the target element.
 */
export function useCursorTarget(
    surface: MaybeRefOrGetter<ICursorSurface | null>,
    targetId: MaybeRefOrGetter<string>,
    element: MaybeRefOrGetter<HTMLElement | null>
): void {
    let stop: WatchHandle | undefined;

    onMounted(() => {
        stop = watch(
            [() => toValue(surface), () => toValue(targetId), () => toValue(element)],
            ([attachment, id, target], _previous, onCleanup) => {
                if (attachment && target) onCleanup(attachment.registerTarget(id, target));
            },
            { immediate: true, flush: 'post' }
        );
    });
    onScopeDispose(() => stop?.());
}
