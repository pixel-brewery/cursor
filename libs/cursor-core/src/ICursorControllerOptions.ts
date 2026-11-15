import type { CursorCommand } from './CursorCommand.js';
import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorTransport } from './ICursorTransport.js';

/**
 * The scope and host capabilities of one mounted view.
 *
 * @public
 */
export interface ICursorControllerOptions {
    readonly viewId: string;
    readonly participant: ICursorParticipant;
    readonly transport: ICursorTransport;
    /** Supply increasing values when reattaching a view with the same participant ID. */
    readonly generation?: number;
    /** Authorize against current host state. An omitted policy denies invocations. */
    readonly authorize?: (
        command: Extract<CursorCommand, { kind: 'invoke' }>,
        signal: AbortSignal,
    ) => boolean | Promise<boolean>;
}
