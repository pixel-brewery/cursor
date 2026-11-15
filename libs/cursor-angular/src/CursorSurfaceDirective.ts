// #region Imports

import { afterRenderEffect, computed, Directive, ElementRef, inject, input, signal } from '@angular/core';
import { attachCursorSurface, type ICursorSurface, type ICursorSurfaceOptions } from '@pixel-brewery/cursor-browser';

// #endregion

/**
 * Attach the browser renderer to the host element during Angular's browser render lifecycle.
 *
 * @public
 */
@Directive({ selector: '[cursorSurface]' })
export class CursorSurfaceDirective {
    readonly cursorSurface = input.required<Omit<ICursorSurfaceOptions, 'surface'>>();

    readonly #element = inject<ElementRef<HTMLElement>>(ElementRef);
    readonly #controller = computed(() => this.cursorSurface().controller);
    readonly #showLocalPointer = computed(() => this.cursorSurface().showLocalPointer ?? false);
    readonly #attachment = signal<ICursorSurface | null>(null);

    /**
     * Observe the current attachment for targets inside this surface.
     *
     * @public
     * @readonly
     */
    readonly attachment = this.#attachment.asReadonly();

    constructor() {
        afterRenderEffect((onCleanup) => {
            const surface = attachCursorSurface({
                surface: this.#element.nativeElement,
                controller: this.#controller(),
                showLocalPointer: this.#showLocalPointer()
            });
            this.#attachment.set(surface);
            onCleanup(() => {
                this.#attachment.set(null);
                surface.dispose();
            });
        });
    }
}
