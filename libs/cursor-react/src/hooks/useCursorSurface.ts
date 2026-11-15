// #region Imports

import {
    attachCursorSurface,
    type ICursorSurface,
    type ICursorSurfaceOptions,
} from '@pixel-brewery/cursor-browser';
import { useEffect, useState } from 'react';

// #endregion

interface IAttachment {
    readonly element: HTMLElement;
    readonly controller: ICursorSurfaceOptions['controller'];
    readonly showLocalPointer: boolean;
    readonly allowSurfaceProjection: boolean;
    readonly surface: ICursorSurface;
}

/**
 * Attach the browser renderer to a committed React element.
 *
 * @param element - The element received from a React callback ref, or null until mounted.
 * @param options - The host controller and pointer options. The local pointer is hidden and
 * unanchored remote projection is enabled by default.
 * @returns The current attachment for registering targets or null while it is unavailable.
 * @remarks Changes to the element, controller or pointer options dispose the previous attachment.
 * React also disposes the attachment on unmount. The host owns the controller.
 *
 * @public
 */
export function useCursorSurface(
    element: HTMLElement | null,
    options: Omit<ICursorSurfaceOptions, 'surface'>,
): ICursorSurface | null {
    const { controller, showLocalPointer = false, allowSurfaceProjection = true } = options;
    const [attachment, setAttachment] = useState<IAttachment | null>(null);

    useEffect(() => {
        if (!element?.isConnected) return;

        const surface = attachCursorSurface({
            surface: element,
            controller,
            showLocalPointer,
            allowSurfaceProjection,
        });
        setAttachment({ element, controller, showLocalPointer, allowSurfaceProjection, surface });
        return () => surface.dispose();
    }, [element, controller, showLocalPointer, allowSurfaceProjection]);

    if (
        attachment?.element === element &&
        attachment.controller === controller &&
        attachment.showLocalPointer === showLocalPointer &&
        attachment.allowSurfaceProjection === allowSurfaceProjection
    ) {
        return attachment.surface;
    }
    return null;
}
