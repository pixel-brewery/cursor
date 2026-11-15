import type { ICursorController } from '@pixel-brewery/cursor-core';
import { useCursorSurface, useCursorTarget } from '@pixel-brewery/cursor-react';
import { createElement, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { IFixture } from './IFixture.js';

function Fixture({
    controller,
    targetId,
    allowSurfaceProjection,
}: {
    controller: ICursorController;
    targetId: string;
    allowSurfaceProjection: boolean;
}) {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const [button, setButton] = useState<HTMLButtonElement | null>(null);
    const surface = useCursorSurface(element, { controller, allowSurfaceProjection });
    useCursorTarget(surface, targetId, button);

    return createElement(
        'section',
        { ref: setElement, 'data-testid': 'surface' },
        createElement('button', { ref: setButton, type: 'button', key: targetId }, 'Target'),
    );
}

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    const root = createRoot(node);
    let controller = initial;
    let targetId = 'settings';
    let allowSurfaceProjection = true;
    const render = () =>
        root.render(
            createElement(
                StrictMode,
                null,
                createElement(Fixture, { controller, targetId, allowSurfaceProjection }),
            ),
        );
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
        setSurfaceProjection(allowed) {
            allowSurfaceProjection = allowed;
            render();
        },
        destroy() {
            root.unmount();
        },
    };
}
