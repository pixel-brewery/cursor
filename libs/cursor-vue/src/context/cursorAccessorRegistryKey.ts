// #region Imports

import type { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';
import type { InjectionKey } from 'vue';

// #endregion

export const cursorAccessorRegistryKey: InjectionKey<CursorAccessorRegistry> =
    Symbol('cursor-accessor-registry');
