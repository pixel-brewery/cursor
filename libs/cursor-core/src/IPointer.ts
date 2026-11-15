import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorPosition } from './ICursorPosition.js';

/**
 * The latest visible position for a remote participant.
 *
 * @public
 */
export interface IPointer {
    readonly participant: ICursorParticipant;
    readonly position: ICursorPosition;
    readonly targetId?: string;
}
