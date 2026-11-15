// #region Imports

import type { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';
import { getContext } from 'svelte';
import { cursorAccessorRegistryKey } from './cursorAccessorRegistryKey.js';

// #endregion

/**
 * Resolves the nearest accessor registry during Svelte component initialization.
 *
 * @returns The registry configured for this subtree.
 * @throws If the subtree is missing a Cursor provider.
 * @public
 */
export function useCursorAccessorRegistry(): CursorAccessorRegistry {
    const registry = getContext<CursorAccessorRegistry | undefined>(cursorAccessorRegistryKey);
    if (!registry) throw new Error('Call provideCursor in a parent component.');
    return registry;
}
