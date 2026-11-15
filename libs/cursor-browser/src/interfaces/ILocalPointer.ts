// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';

// #endregion

/**
 * The latest local position and optional target.
 *
 * @internal
 */
export interface ILocalPointer {
    readonly position: ICursorPosition;
    readonly targetId?: string;
}
