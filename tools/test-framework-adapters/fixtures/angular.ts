import '@angular/compiler';
import { afterRenderEffect, Component, Directive, ElementRef, inject, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
    CursorAccessorRegistry,
    CursorSurfaceDirective,
    CursorTargetDirective,
    provideCursor,
    withCursorAccessors,
} from '@pixel-brewery/cursor-angular';
import type { ICursorController } from '@pixel-brewery/cursor-core';
import { FixtureButtonAccessor, markFixtureButtonAccessor } from './FixtureButtonAccessor.js';
import type { IFixture } from './IFixture.js';

const controller = signal<ICursorController | null>(null);
const target = signal('settings');
const project = signal(true);

@Directive({ selector: '[fixtureButtonAccessor]' })
class FixtureButtonAccessorDirective {
    constructor() {
        const { nativeElement } = inject<ElementRef<HTMLButtonElement>>(ElementRef);
        const registry = inject(CursorAccessorRegistry);

        afterRenderEffect(() => markFixtureButtonAccessor(registry, nativeElement));
    }
}

@Component({
    selector: 'cursor-adapter-fixture',
    imports: [CursorSurfaceDirective, CursorTargetDirective, FixtureButtonAccessorDirective],
    template: `
        @if (controller(); as current) {
            <section
                data-testid="surface"
                [cursorSurface]="{ controller: current, allowSurfaceProjection: project() }"
            >
                @for (id of [target()]; track id) {
                    <button fixtureButtonAccessor type="button" [cursorTarget]="id">Target</button>
                }
            </section>
        }
    `,
})
class Fixture {
    readonly controller = controller;
    readonly target = target;
    readonly project = project;
}

export async function mount(node: HTMLElement, initial: ICursorController): Promise<IFixture> {
    controller.set(initial);
    const host = node.ownerDocument.createElement('cursor-adapter-fixture');
    node.append(host);
    const app = await bootstrapApplication(Fixture, {
        providers: [provideCursor(withCursorAccessors(FixtureButtonAccessor))],
    });

    return {
        setController(next) {
            controller.set(next);
        },
        setTargetId(next) {
            target.set(next);
        },
        setSurfaceProjection(allowed) {
            project.set(allowed);
        },
        destroy() {
            app.destroy();
            host.remove();
        },
    };
}
