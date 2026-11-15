// #region Imports

import {
    attachCursorSurface,
    type ICursorSurface,
    type ICursorSurfaceOptions
} from '@pixel-brewery/cursor-browser';
import { useEffect, useState } from 'react';

// #endregion

interface IAttachment {
    readonly element: HTMLElement;
    readonly controller: ICursorSurfaceOptions['controller'];
    readonly showLocalPointer: boolean;
    readonly surface: ICursorSurface;
}

/**
 * Attach the browser renderer while the committed element and controller are current.
 *
 * @public
 * @param element - The element received from a React callback ref, or null until mounted.
 * @param options - The controller and local pointer visibility for this surface.
 * @returns The active surface for registering targets.
 */
export function useCursorSurface(
    element: HTMLElement | null,
    options: Omit<ICursorSurfaceOptions, 'surface'>
): ICursorSurface | null {
    const { controller, showLocalPointer = false } = options;
    const [attachment, setAttachment] = useState<IAttachment | null>(null);

    useEffect(() => {
        if (!element?.isConnected) return;

        const surface = attachCursorSurface({ surface: element, controller, showLocalPointer });
        setAttachment({ element, controller, showLocalPointer, surface });
        return () => surface.dispose();
    }, [element, controller, showLocalPointer]);

    if (attachment?.element === element && attachment.controller === controller &&
        attachment.showLocalPointer === showLocalPointer) {
        return attachment.surface;
    }
    return null;
}
