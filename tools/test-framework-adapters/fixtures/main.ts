import { createCursorController } from '@pixel-brewery/cursor-core';

const fixtures = {
    angular: () => import('./angular.js'),
    react: () => import('./react.js'),
    vue: () => import('./vue.js'),
    svelte: () => import('./svelte.js')
};

function createController(viewId: string) {
    return createCursorController({
        viewId,
        participant: { id: 'fixture', label: 'Fixture' },
        transport: {
            publish() {},
            subscribe() {
                return () => {};
            }
        },
        authorize: () => true
    });
}

const framework = new URL(window.location.href).searchParams.get('framework');
if (framework !== 'angular' && framework !== 'react' && framework !== 'vue' && framework !== 'svelte') {
    throw new Error('Missing framework in fixture URL.');
}
const host = document.querySelector<HTMLElement>('#app');
if (!host) throw new Error('Missing fixture host.');

const initial = createController('initial');
const replacement = createController('replacement');
const fixture = await (await fixtures[framework]()).mount(host, initial);

Object.assign(window, {
    cursorFixture: {
        setTargetId(id: string) {
            fixture.setTargetId(id);
        },
        replaceController() {
            fixture.setController(replacement);
        },
        async show(controller: 'initial' | 'replacement', targetId: string) {
            const result = await (controller === 'initial' ? initial : replacement).run({ kind: 'show', targetId });
            return result.status;
        },
        destroy() {
            return fixture.destroy();
        }
    }
});

window.addEventListener('pagehide', () => {
    initial.dispose();
    replacement.dispose();
}, { once: true });
