// #region Imports

import { CursorAccessorRegistry, type ICursorFeature } from '@pixel-brewery/cursor-browser';
import { provide } from 'vue';
import { cursorAccessorRegistryKey } from './cursorAccessorRegistryKey.js';

// #endregion

/**
 * Configures the accessor registry shared by the current Vue component's descendants.
 * Call during setup with the features for this subtree.
 *
 * @param features - Cursor features to install in the registry.
 * @returns The registry provided to the subtree.
 * @public
 */
export function provideCursor(...features: readonly ICursorFeature[]): CursorAccessorRegistry {
    const registry = new CursorAccessorRegistry(...features);
    provide(cursorAccessorRegistryKey, registry);
    return registry;
}
