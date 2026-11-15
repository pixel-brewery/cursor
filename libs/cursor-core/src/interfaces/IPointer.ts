// #region Imports

import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorPosition } from './ICursorPosition.js';

// #endregion

/**
 * The latest visible position for a remote participant.
 *
 * @public
 */
export interface IPointer {
    /**
     * Authenticated participant identity and display information.
     */
    readonly participant: ICursorParticipant;

    /**
     * Normalized position within the shared surface.
     */
    readonly position: ICursorPosition;

    /**
     * Optional anchor that a receiver can resolve in its own layout.
     */
    readonly targetId?: string;
}
