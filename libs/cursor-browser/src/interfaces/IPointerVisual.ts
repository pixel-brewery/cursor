// #region Imports

import type { ICursorPosition } from '@pixel-brewery/cursor-core';

// #endregion

/**
 * The projected data for one DOM marker.
 *
 * @internal
 */
export interface IPointerVisual {
    readonly id: string;
    readonly label: string;
    readonly kind: 'human' | 'assistant';
    readonly position: ICursorPosition;
    readonly color: string | undefined;
    readonly targetId: string | undefined;
    readonly local?: boolean;
    readonly arrived?: boolean;
}
