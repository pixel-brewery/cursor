// #region Imports

import { afterRenderEffect, Directive, ElementRef, inject, input } from '@angular/core';
import { CursorSurfaceDirective } from './CursorSurfaceDirective.js';

// #endregion

/**
 * Register the host element with its nearest cursor surface.
 *
 * @public
 */
@Directive({ selector: '[cursorTarget]' })
export class CursorTargetDirective {
    readonly cursorTarget = input.required<string>();

    constructor() {
        const element = inject<ElementRef<HTMLElement>>(ElementRef);
        const surface = inject(CursorSurfaceDirective);

        afterRenderEffect((onCleanup) => {
            const targetId = this.cursorTarget();
            const attachment = surface.attachment();
            if (attachment) onCleanup(attachment.registerTarget(targetId, element.nativeElement));
        });
    }
}
