// #region Imports

import { afterRenderEffect, Directive, ElementRef, inject, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { CursorSurfaceDirective } from './CursorSurfaceDirective.js';

// #endregion

/**
 * Registers the host element with its nearest Cursor surface.
 *
 * @remarks Angular releases the registration when the target identifier or surface
 * changes and when the directive is destroyed.
 *
 * @public
 */
@Directive({ selector: '[cursorTarget]' })
export class CursorTargetDirective {
    // #region Ctor

    /**
     * Resolves the owning surface and registers the target after rendering.
     *
     * @public
     */
    public constructor() {
        const element = inject<ElementRef<HTMLElement>>(ElementRef);
        const surface = inject(CursorSurfaceDirective);

        afterRenderEffect((onCleanup) => {
            const targetId = this.cursorTarget();
            const attachment = surface.attachment();
            if (attachment) onCleanup(attachment.registerTarget(targetId, element.nativeElement));
        });
    }

    // #endregion

    // #region Properties

    /**
     * Stable identifier used by assistant commands to resolve this element.
     *
     * @public
     * @readonly
     */
    public readonly cursorTarget: InputSignal<string> = input.required<string>();

    // #endregion
}
