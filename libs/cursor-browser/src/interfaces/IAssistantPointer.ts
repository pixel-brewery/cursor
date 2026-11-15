// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';

// #endregion

/**
 * The assistant target and its viewport position.
 *
 * @internal
 */
export interface IAssistantPointer {
    readonly targetId: string;
    position: ICursorPosition;
}
