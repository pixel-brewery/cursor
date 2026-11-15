// #region Imports

import type { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';
import { useContext } from 'react';
import { CursorAccessorRegistryContext } from '../providers/CursorAccessorRegistryContext.js';

// #endregion

/**
 * Reads the accessor registry from the nearest `CursorProvider`.
 *
 * @returns The registry for the current Cursor scope.
 * @throws If the calling component has no ancestor `CursorProvider`.
 *
 * @public
 */
export function useCursorAccessorRegistry(): CursorAccessorRegistry {
    const registry = useContext(CursorAccessorRegistryContext);
    if (!registry) throw new Error('useCursorAccessorRegistry must be called within CursorProvider.');
    return registry;
}
