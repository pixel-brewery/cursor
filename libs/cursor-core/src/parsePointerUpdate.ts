// #region Imports

import type { IPointerUpdate } from './models/IPointerUpdate.js';
import { readTransportEvent } from './utils/CursorWireUtils.js';

// #endregion

/**
 * Parses an untrusted wire value as a move or leave update.
 *
 * @remarks This validates the wire format. The host must authenticate the
 * participant and authorize view membership before forwarding an update.
 *
 * @param value - Untrusted update from the transport.
 * @returns A normalized copy when its fields are valid. Malformed values and
 * transport lifecycle events return undefined.
 *
 * @public
 */
export function parsePointerUpdate(value: unknown): IPointerUpdate | undefined {
    const event = readTransportEvent(value);
    return event?.kind === 'move' || event?.kind === 'leave' ? event : undefined;
}
