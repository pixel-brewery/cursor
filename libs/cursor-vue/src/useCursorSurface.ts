// #region Imports

import {
    attachCursorSurface,
    type ICursorSurface,
    type ICursorSurfaceOptions
} from '@pixel-brewery/cursor-browser';
import {
    onMounted,
    onScopeDispose,
    shallowReadonly,
    shallowRef,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type ShallowRef,
    type WatchHandle
} from 'vue';

// #endregion

/**
 * Attach the renderer to a Vue template ref after mounting.
 *
 * @public
 * @param element - The mounted element or a getter that resolves it.
 * @param options - The controller and local pointer visibility for this surface.
 * @returns A shallow readonly ref to the current attachment.
 */
export function useCursorSurface(
    element: MaybeRefOrGetter<HTMLElement | null>,
    options: MaybeRefOrGetter<Omit<ICursorSurfaceOptions, 'surface'>>
): Readonly<ShallowRef<ICursorSurface | null>> {
    const attachment = shallowRef<ICursorSurface | null>(null);
    let stop: WatchHandle | undefined;

    onMounted(() => {
        stop = watch(
            [
                () => toValue(element),
                () => toValue(options).controller,
                () => toValue(options).showLocalPointer ?? false
            ],
            ([surface, controller, showLocalPointer], _previous, onCleanup) => {
                if (!surface) return;

                const current = attachCursorSurface({ surface, controller, showLocalPointer });
                attachment.value = current;
                onCleanup(() => {
                    attachment.value = null;
                    current.dispose();
                });
            },
            { immediate: true, flush: 'post' }
        );
    });
    onScopeDispose(() => stop?.());

    return shallowReadonly(attachment);
}
