// #region Imports

import type { IPointerUpdate } from '../models/IPointerUpdate.js';

// #endregion

/**
 * Connects a controller to a host-authenticated delivery channel.
 *
 * @remarks Authenticate participants and authorize view membership before
 * forwarding updates. Cursor validates incoming data and isolates its view.
 *
 * @public
 */
export interface ICursorTransport {
    /**
     * Publishes a pointer update for the local participant.
     *
     * @param update - The move or leave event within the controller's view.
     * @throws A synchronous transport failure when the update cannot be sent.
     */
    publish(update: IPointerUpdate): void;

    /**
     * Subscribes to incoming wire data and transport lifecycle events.
     *
     * @param listener - The callback that receives each incoming wire value.
     * Emit a connected event after reconnecting to resume delivery.
     * @returns An unsubscribe operation. The controller calls it on disposal.
     */
    subscribe(listener: (event: unknown) => void): () => void;
}
