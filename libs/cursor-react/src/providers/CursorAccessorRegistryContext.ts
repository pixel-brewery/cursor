// #region Imports

import type { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';
import { createContext } from 'react';

// #endregion

export const CursorAccessorRegistryContext = createContext<CursorAccessorRegistry | null>(null);
