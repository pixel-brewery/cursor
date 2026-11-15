// #region Imports

import {
    afterRenderEffect,
    computed,
    Directive,
    ElementRef,
    inject,
    input,
    signal,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import type { ICursorSurface, ICursorSurfaceOptions } from '@pixel-brewery/cursor-browser';

// #endregion

/**
 * Attaches a browser renderer to an Angular host element.
 *
 * @remarks Each renderer is disposed when the controller or its pointer options
 * change and when Angular destroys the directive. The caller owns the controller.
 *
 * @public
 */
@Directive({ selector: '[cursorSurface]' })
export class CursorSurfaceDirective {
    // #region Fields

    private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _controller = computed(() => this.cursorSurface().controller);
    private readonly _showLocalPointer = computed(
        () => this.cursorSurface().showLocalPointer ?? false,
    );
    private readonly _allowSurfaceProjection = computed(
        () => this.cursorSurface().allowSurfaceProjection ?? true,
    );
    private readonly _attachment = signal<ICursorSurface | null>(null);

    // #endregion

    // #region Ctor

    /**
     * Registers the attachment effect with Angular's browser render lifecycle.
     *
     * @public
     */
    public constructor() {
        afterRenderEffect((onCleanup) => {
            const surface = attachCursorSurface({
                surface: this._element.nativeElement,
                controller: this._controller(),
                showLocalPointer: this._showLocalPointer(),
                allowSurfaceProjection: this._allowSurfaceProjection(),
            });
            this._attachment.set(surface);
            onCleanup(() => {
                this._attachment.set(null);
                surface.dispose();
            });
        });
    }

    // #endregion

    // #region Properties

    /**
     * The host controller and pointer options. By default the local pointer is hidden
     * and unanchored remote positions are projected into the receiving surface.
     *
     * @public
     * @readonly
     */
    public readonly cursorSurface: InputSignal<Omit<ICursorSurfaceOptions, 'surface'>> =
        input.required<Omit<ICursorSurfaceOptions, 'surface'>>();

    /**
     * The active browser attachment, or null before registration and after cleanup.
     *
     * @public
     * @readonly
     */
    public readonly attachment: Signal<ICursorSurface | null> = this._attachment.asReadonly();

    // #endregion
}
