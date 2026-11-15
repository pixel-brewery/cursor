// #region Imports

import {
    attachCursorSurface,
    type ICursorSurface,
    type ICursorSurfaceOptions,
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
    type WatchHandle,
} from 'vue';

// #endregion

/**
 * Attach the renderer to a Vue template ref after mounting.
 *
 * @param element - The mounted element or a getter that resolves it.
 * @param options - The host controller and pointer options. The local pointer is hidden and
 * unanchored remote projection is enabled by default.
 * @returns A shallow readonly ref to the current attachment, or null before mounting and during cleanup.
 * @remarks Rendered element or option changes release the previous attachment. Vue also disposes
 * the attachment when the component scope ends. The host owns the controller.
 *
 * @public
 */
export function useCursorSurface(
    element: MaybeRefOrGetter<HTMLElement | null>,
    options: MaybeRefOrGetter<Omit<ICursorSurfaceOptions, 'surface'>>,
): Readonly<ShallowRef<ICursorSurface | null>> {
    const attachment = shallowRef<ICursorSurface | null>(null);
    let stop: WatchHandle | undefined;

    onMounted(() => {
        stop = watch(
            [
                () => toValue(element),
                () => toValue(options).controller,
                () => toValue(options).showLocalPointer ?? false,
                () => toValue(options).allowSurfaceProjection ?? true,
            ],
            (
                [surface, controller, showLocalPointer, allowSurfaceProjection],
                _previous,
                onCleanup,
            ) => {
                if (!surface) return;

                const current = attachCursorSurface({
                    surface,
                    controller,
                    showLocalPointer,
                    allowSurfaceProjection,
                });
                attachment.value = current;
                onCleanup(() => {
                    attachment.value = null;
                    current.dispose();
                });
            },
            { immediate: true, flush: 'post' },
        );
    });
    onScopeDispose(() => stop?.());

    return shallowReadonly(attachment);
}
