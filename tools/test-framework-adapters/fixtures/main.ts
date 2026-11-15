import { createCursorController, type IPointerUpdate } from '@pixel-brewery/cursor-core';

const fixtures = {
    angular: () => import('./angular.js'),
    react: () => import('./react.js'),
    vue: () => import('./vue.js'),
    svelte: () => import('./svelte.js'),
};

type ControllerName = 'initial' | 'replacement';
const receivers = new Map<ControllerName, (event: unknown) => void>();

function createController(viewId: ControllerName) {
    return createCursorController({
        viewId,
        participant: { id: 'fixture', label: 'Fixture' },
        transport: {
            publish() {},
            subscribe(receive) {
                receivers.set(viewId, receive);
                return () => receivers.delete(viewId);
            },
        },
        authorize: () => true,
    });
}

const framework = new URL(window.location.href).searchParams.get('framework');
if (
    framework !== 'angular' &&
    framework !== 'react' &&
    framework !== 'vue' &&
    framework !== 'svelte'
) {
    throw new Error('Missing framework in fixture URL.');
}
const host = document.querySelector<HTMLElement>('#app');
if (!host) throw new Error('Missing fixture host.');

const initial = createController('initial');
const replacement = createController('replacement');
const fixture = await (await fixtures[framework]()).mount(host, initial);

let sequence = 0;
const cursorFixture = {
    setTargetId(id: string) {
        fixture.setTargetId(id);
    },
    replaceController() {
        fixture.setController(replacement);
    },
    setSurfaceProjection(allowed: boolean) {
        fixture.setSurfaceProjection(allowed);
    },
    receivePointer(targetId?: string) {
        const update: IPointerUpdate = {
            kind: 'move',
            viewId: 'initial',
            participant: { id: 'remote', label: 'Remote' },
            generation: 1,
            sequence: ++sequence,
            position: { x: 0.8, y: 0.8 },
            ...(targetId === undefined ? {} : { targetId }),
        };
        receivers.get('initial')?.(update);
    },
    async show(controller: ControllerName, targetId: string) {
        const result = await (controller === 'initial' ? initial : replacement).run({
            kind: 'show',
            targetId,
        });
        return result.status;
    },
    destroy() {
        return fixture.destroy();
    },
};

declare global {
    interface Window {
        cursorFixture: typeof cursorFixture;
    }
}

window.cursorFixture = cursorFixture;

window.addEventListener(
    'pagehide',
    () => {
        initial.dispose();
        replacement.dispose();
    },
    { once: true },
);
