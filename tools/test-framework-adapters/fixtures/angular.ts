import '@angular/compiler';
import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CursorSurfaceDirective, CursorTargetDirective } from '@pixel-brewery/cursor-angular';
import type { ICursorController } from '@pixel-brewery/cursor-core';
import type { IFixture } from './IFixture.js';

const controller = signal<ICursorController | null>(null);
const target = signal('settings');
const project = signal(true);

@Component({
    selector: 'cursor-adapter-fixture',
    imports: [CursorSurfaceDirective, CursorTargetDirective],
    template: `
        @if (controller(); as current) {
            <section
                data-testid="surface"
                [cursorSurface]="{ controller: current, allowSurfaceProjection: project() }"
            >
                @for (id of [target()]; track id) {
                    <button type="button" [cursorTarget]="id">Target</button>
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
    const app = await bootstrapApplication(Fixture);

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
