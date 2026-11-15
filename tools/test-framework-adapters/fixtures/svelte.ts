import type { ICursorController } from '@pixel-brewery/cursor-core';
import { mount as mountComponent, unmount } from 'svelte';
import { writable } from 'svelte/store';
import type { IFixture } from './IFixture.js';
import SvelteFixture from './SvelteFixture.svelte';

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    const controller = writable(initial);
    const targetId = writable('settings');
    const component = mountComponent(SvelteFixture, { target: node, props: { controller, targetId } });

    return {
        setController(next) {
            controller.set(next);
        },
        setTargetId(next) {
            targetId.set(next);
        },
        destroy() {
            return unmount(component);
        }
    };
}
