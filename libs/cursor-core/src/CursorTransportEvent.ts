import type { IPointerUpdate } from './IPointerUpdate.js';

/**
 * An authenticated pointer update or a host transport lifecycle event.
 *
 * @public
 */
export type CursorTransportEvent =
    | IPointerUpdate
    | { readonly kind: 'connected' }
    | { readonly kind: 'disconnected' }
    | {
        readonly kind: 'departure';
        readonly viewId: string;
        readonly actorId: string;
        /** Omit only when the host permanently retires the participant ID. */
        readonly generation?: number;
    };
