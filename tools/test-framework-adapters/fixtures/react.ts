import type { ICursorController } from '@pixel-brewery/cursor-core';
import {
    CursorProvider,
    useCursorAccessorRegistry,
    useCursorSurface,
    useCursorTarget,
    withCursorAccessors,
} from '@pixel-brewery/cursor-react';
import { createElement, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FixtureButtonAccessor, markFixtureButtonAccessor } from './FixtureButtonAccessor.js';
import type { IFixture } from './IFixture.js';

const features = [withCursorAccessors(FixtureButtonAccessor)];

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
    const registry = useCursorAccessorRegistry();
    const surface = useCursorSurface(element, { controller, allowSurfaceProjection });
    useCursorTarget(surface, targetId, button);
    useEffect(() => {
        if (button) markFixtureButtonAccessor(registry, button);
    }, [button, registry]);

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
                createElement(
                    CursorProvider,
                    { features },
                    createElement(Fixture, { controller, targetId, allowSurfaceProjection }),
                ),
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
