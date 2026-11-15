// #region Imports

import { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';
import { createElement, useMemo, type ReactNode } from 'react';
import { CursorAccessorRegistryContext } from './CursorAccessorRegistryContext.js';
import type { ICursorProviderProps } from './ICursorProviderProps.js';

// #endregion

/**
 * Shares a Cursor accessor registry with the React subtree.
 *
 * @param props - Cursor features and descendant content. The registry starts empty without features.
 * @returns The descendant content within the registry context.
 *
 * @public
 */
export function CursorProvider({ features, children }: ICursorProviderProps): ReactNode {
    const registry = useMemo(() => new CursorAccessorRegistry(...(features ?? [])), [features]);
    return createElement(CursorAccessorRegistryContext.Provider, { value: registry }, children);
}
