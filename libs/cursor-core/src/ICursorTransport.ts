import type { IPointerUpdate } from './IPointerUpdate.js';

/**
 * Connects the controller to the host's authenticated delivery channel.
 *
 * @public
 */
export interface ICursorTransport {
    /** Publish one local pointer update. */
    publish(update: IPointerUpdate): void;
    /** Receive wire data and lifecycle events. Returns an unsubscribe operation. */
    subscribe(listener: (event: unknown) => void): () => void;
}
