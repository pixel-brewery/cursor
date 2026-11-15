import type { ICursorController } from '@pixel-brewery/cursor-core';
import { useCursorSurface, useCursorTarget } from '@pixel-brewery/cursor-vue';
import { createApp, h, shallowRef } from 'vue';
import type { IFixture } from './IFixture.js';

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    const controller = shallowRef(initial);
    const targetId = shallowRef('settings');

    const app = createApp({
        setup() {
            const element = shallowRef<HTMLElement | null>(null);
            const button = shallowRef<HTMLButtonElement | null>(null);
            const surface = useCursorSurface(element, () => ({ controller: controller.value }));
            useCursorTarget(surface, targetId, button);

            return () => h('section', { ref: element, 'data-testid': 'surface' },
                h('button', { ref: button, type: 'button', key: targetId.value }, 'Target'));
        }
    });
    app.mount(node);

    return {
        setController(next) {
            controller.value = next;
        },
        setTargetId(next) {
            targetId.value = next;
        },
        destroy() {
            app.unmount();
        }
    };
}
