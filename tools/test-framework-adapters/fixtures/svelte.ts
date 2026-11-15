import type { ICursorController } from '@pixel-brewery/cursor-core';
import { mount as mountComponent, unmount } from 'svelte';
import { writable } from 'svelte/store';
import type { IFixture } from './IFixture.js';
import SvelteCursorProviderFixture from './SvelteCursorProviderFixture.svelte';

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    const controller = writable(initial);
    const targetId = writable('settings');
    const allowSurfaceProjection = writable(true);
    const component = mountComponent(SvelteCursorProviderFixture, {
        target: node,
        props: { controller, targetId, allowSurfaceProjection },
    });

    return {
        setController(next) {
            controller.set(next);
        },
        setTargetId(next) {
            targetId.set(next);
        },
        setSurfaceProjection(allowed) {
            allowSurfaceProjection.set(allowed);
        },
        destroy() {
            return unmount(component);
        },
    };
}
