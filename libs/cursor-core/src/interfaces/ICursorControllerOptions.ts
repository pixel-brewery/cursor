// #region Imports

import type { CursorCommand } from '../models/CursorCommand.js';
import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorTransport } from './ICursorTransport.js';

// #endregion

/**
 * The scope and host capabilities for one mounted view.
 *
 * @public
 */
export interface ICursorControllerOptions {
    /**
     * Identifier of the shared surface and resource. Updates for other views
     * are ignored.
     */
    readonly viewId: string;

    /**
     * Identity and display metadata of the participant authenticated by the host.
     */
    readonly participant: ICursorParticipant;

    /**
     * Host-owned transport for authenticated pointer and lifecycle events.
     */
    readonly transport: ICursorTransport;

    /**
     * Positive safe integer for this attachment. Supply increasing values
     * across reattachments when the host reuses a participant identifier.
     * Omission uses a process-local increasing value.
     */
    readonly generation?: number;

    /**
     * Authorizes an invocation against current host state.
     *
     * @param command - The request with the bound target, action and input.
     * @param signal - Cooperative cancellation while authorization is pending.
     * @returns True to allow the handler to run. False or an omitted policy
     * denies the action.
     * @throws An error reported as a failed command. The handler is not called.
     */
    readonly authorize?: (
        command: Extract<CursorCommand, { kind: 'invoke' }>,
        signal: AbortSignal,
    ) => boolean | Promise<boolean>;
}
