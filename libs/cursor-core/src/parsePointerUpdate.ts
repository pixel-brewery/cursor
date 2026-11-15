import type { IPointerUpdate } from './IPointerUpdate.js';
import { readTransportEvent } from './wire.js';

/**
 * Parse an untrusted wire value as a move or leave update.
 *
 * @public
 * @param value - Untrusted update from the transport.
 * @returns A normalized update when its fields are valid.
 */
export function parsePointerUpdate(value: unknown): IPointerUpdate | undefined {
    const event = readTransportEvent(value);
    return event?.kind === 'move' || event?.kind === 'leave' ? event : undefined;
}
