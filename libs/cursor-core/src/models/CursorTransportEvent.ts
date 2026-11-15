// #region Imports

import type { IPointerUpdate } from './IPointerUpdate.js';

// #endregion

/**
 * An authenticated update or lifecycle event supplied by the host transport.
 *
 * @public
 */
export type CursorTransportEvent =
    | IPointerUpdate
    | {
          /**
           * Activate delivery and guided commands after a disconnect.
           */
          readonly kind: 'connected';
      }
    | {
          /**
           * Clear visible pointers and cancel pending guidance until reconnect.
           */
          readonly kind: 'disconnected';
      }
    | {
          /**
           * Remove the participant and reject subsequent updates from the
           * departed generation.
           */
          readonly kind: 'departure';

          /**
           * View the participant left.
           */
          readonly viewId: string;

          /**
           * Host-authenticated participant identifier.
           */
          readonly actorId: string;

          /**
           * Retired attachment generation. Omit only when the host
           * permanently retires the participant identifier.
           */
          readonly generation?: number;
      };
