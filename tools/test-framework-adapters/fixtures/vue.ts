import type { ICursorController } from '@pixel-brewery/cursor-core';
import {
    CursorProvider,
    useCursorAccessorRegistry,
    useCursorSurface,
    useCursorTarget,
    withCursorAccessors,
} from '@pixel-brewery/cursor-vue';
import { createApp, h, shallowRef, watchPostEffect } from 'vue';
import { FixtureButtonAccessor, markFixtureButtonAccessor } from './FixtureButtonAccessor.js';
import type { IFixture } from './IFixture.js';

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    const controller = shallowRef(initial);
    const targetId = shallowRef('settings');
    const allowSurfaceProjection = shallowRef(true);

    const fixture = {
        setup() {
            const element = shallowRef<HTMLElement | null>(null);
            const button = shallowRef<HTMLButtonElement | null>(null);
            const registry = useCursorAccessorRegistry();
            const surface = useCursorSurface(element, () => ({
                controller: controller.value,
                allowSurfaceProjection: allowSurfaceProjection.value,
            }));
            useCursorTarget(surface, targetId, button);

            watchPostEffect(() => {
                const target = button.value;
                if (target) markFixtureButtonAccessor(registry, target);
            });

            return () =>
                h(
                    'section',
                    { ref: element, 'data-testid': 'surface' },
                    h('button', { ref: button, type: 'button', key: targetId.value }, 'Target'),
                );
        },
    };
    const features = [withCursorAccessors(FixtureButtonAccessor)];
    const app = createApp({
        render: () => h(CursorProvider, { features }, { default: () => h(fixture) }),
    });
    app.mount(node);

    return {
        setController(next) {
            controller.value = next;
        },
        setTargetId(next) {
            targetId.value = next;
        },
        setSurfaceProjection(allowed) {
            allowSurfaceProjection.value = allowed;
        },
        destroy() {
            app.unmount();
        },
    };
}
