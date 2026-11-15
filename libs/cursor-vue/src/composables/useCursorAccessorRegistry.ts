// #region Imports

import type { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';
import { inject } from 'vue';
import { cursorAccessorRegistryKey } from '../context/cursorAccessorRegistryKey.js';

// #endregion

/**
 * Resolves the nearest accessor registry during Vue setup.
 *
 * @returns The registry configured for this subtree.
 * @throws If the subtree is missing a Cursor provider.
 * @public
 */
export function useCursorAccessorRegistry(): CursorAccessorRegistry {
    const registry = inject(cursorAccessorRegistryKey, null);
    if (!registry) throw new Error('Use CursorProvider or provideCursor in a parent component.');
    return registry;
}
