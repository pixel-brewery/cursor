import type { CursorCommand } from './CursorCommand.js';
import type { CursorResult } from './CursorResult.js';
import type { ICursorAction } from './ICursorAction.js';
import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorPosition } from './ICursorPosition.js';
import type { IPointer } from './IPointer.js';

/**
 * Tracks remote pointers and coordinates guided actions for one view.
 *
 * @public
 */
export interface ICursorController {
    readonly participant: ICursorParticipant;
    /** Whether the controller currently accepts pointer updates and guided commands. */
    readonly isConnected: boolean;
    /** Get the current immutable snapshot of remote pointers. */
    getPointers(): readonly IPointer[];
    /** Observe pointer snapshots and connection transitions. Returns an unsubscribe operation. */
    subscribe(listener: (pointers: readonly IPointer[]) => void): () => void;
    /** Publish the local pointer's position. */
    move(position: ICursorPosition, targetId?: string): void;
    /** Withdraw the local pointer from this view. */
    leave(): void;
    /** Register a presenter and return a release operation for its current registration. */
    registerTarget(
        targetId: string,
        presenter: (context: { readonly signal: AbortSignal }) => boolean | Promise<boolean>,
        isAvailable?: () => boolean,
    ): () => void;
    /** Register a host action and return a release operation for its current registration. */
    registerAction(action: ICursorAction): () => void;
    /** Present the target and, on request, authorize and invoke its bound action. */
    run(command: CursorCommand, signal?: AbortSignal): Promise<CursorResult>;
    /** Cancel current guidance, withdraw the local pointer and release the transport subscription. */
    dispose(): void;
}
