import type { ICursorController } from '@pixel-brewery/cursor-core';
import { useCursorSurface, useCursorTarget } from '@pixel-brewery/cursor-react';
import { createElement, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { IFixture } from './IFixture.js';

function Fixture({ controller, targetId }: { controller: ICursorController; targetId: string }) {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const [button, setButton] = useState<HTMLButtonElement | null>(null);
    const surface = useCursorSurface(element, { controller });
    useCursorTarget(surface, targetId, button);

    return createElement('section', { ref: setElement, 'data-testid': 'surface' },
        createElement('button', { ref: setButton, type: 'button', key: targetId }, 'Target'));
}

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    const root = createRoot(node);
    let controller = initial;
    let targetId = 'settings';
    const render = () => root.render(createElement(StrictMode, null, createElement(Fixture, { controller, targetId })));
    render();

    return {
        setController(next) {
            controller = next;
            render();
        },
        setTargetId(next) {
            targetId = next;
            render();
        },
        destroy() {
            root.unmount();
        }
    };
}
