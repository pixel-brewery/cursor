// #region Imports

import { CursorAccessorRegistry, type ICursorFeature } from '@pixel-brewery/cursor-browser';
import { setContext } from 'svelte';
import { cursorAccessorRegistryKey } from './cursorAccessorRegistryKey.js';

// #endregion

/**
 * Configures the accessor registry shared by the current Svelte component's descendants.
 * Call during component initialization with the features for this subtree.
 *
 * @param features - Cursor features to install in the registry.
 * @returns The registry provided to the subtree.
 * @public
 */
export function provideCursor(...features: readonly ICursorFeature[]): CursorAccessorRegistry {
    const registry = new CursorAccessorRegistry(...features);
    return setContext(cursorAccessorRegistryKey, registry);
}
