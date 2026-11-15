// #region Imports

import type { ICursorParticipant } from '../interfaces/ICursorParticipant.js';
import type { ICursorPosition } from '../interfaces/ICursorPosition.js';

// #endregion

/**
 * Transient pointer data scoped to one participant and active view.
 *
 * @public
 */
export type IPointerUpdate = {
    /**
     * Identifier of the shared surface and resource.
     */
    readonly viewId: string;

    /**
     * Participant identity and display metadata verified by the host.
     */
    readonly participant: ICursorParticipant;

    /**
     * Positive safe integer identifying the participant attachment.
     * Increase it when reusing the participant identifier.
     */
    readonly generation: number;

    /**
     * Positive safe integer that increases within the generation.
     */
    readonly sequence: number;
} & (
    | {
          /**
           * Publish the latest visible position.
           */
          readonly kind: 'move';

          /**
           * Finite normalized surface coordinates.
           */
          readonly position: ICursorPosition;

          /**
           * Optional anchor that a receiver can resolve in its own layout.
           */
          readonly targetId?: string;
      }
    | {
          /**
           * Withdraw the currently visible pointer from this view.
           */
          readonly kind: 'leave';
      }
);
