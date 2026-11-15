// #region Imports

import type { CursorCommand } from '../models/CursorCommand.js';
import type { CursorResult } from '../models/CursorResult.js';
import type { ICursorAction } from './ICursorAction.js';
import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorPosition } from './ICursorPosition.js';
import type { IPointer } from './IPointer.js';

// #endregion

/**
 * Tracks remote pointers and coordinates guided actions for one view.
 *
 * @remarks The host owns participant authentication and action authorization.
 * Inbound pointer updates affect presentation only.
 *
 * @public
 */
export interface ICursorController {
    /**
     * Immutable identity and display metadata for the local participant.
     */
    readonly participant: ICursorParticipant;

    /**
     * Whether the controller accepts pointer updates and guided commands.
     *
     * @remarks The controller starts connected and follows transport lifecycle
     * events. Disconnect and disposal suspend both capabilities.
     */
    readonly isConnected: boolean;

    /**
     * Reads the currently visible remote pointers.
     *
     * @returns The immutable snapshot, empty when no remote pointer is visible.
     */
    getPointers(): readonly IPointer[];

    /**
     * Observes pointer snapshots and connection transitions.
     *
     * @param listener - Called synchronously with the current immutable pointer
     * snapshot after a change. Read {@link ICursorController.isConnected} in
     * the callback to distinguish a connection transition.
     * @returns An idempotent unsubscribe function. Subscribing after disposal
     * returns a no-op cleanup.
     * @remarks Use {@link ICursorController.getPointers} to read the initial
     * snapshot. Subscribing does not trigger an initial callback.
     */
    subscribe(listener: (pointers: readonly IPointer[]) => void): () => void;

    /**
     * Publishes the local pointer's position to the host transport.
     *
     * @param position - Finite normalized surface coordinates between zero and
     * one inclusive.
     * @param targetId - Optional registered UI anchor. A compatible receiving
     * surface can resolve it using its own layout.
     * @throws Propagates a synchronous transport publishing error.
     * @remarks Invalid values and calls after disconnection or disposal are
     * ignored.
     */
    move(position: ICursorPosition, targetId?: string): void;

    /**
     * Withdraws the local pointer from this view.
     *
     * @throws Propagates a synchronous transport publishing error.
     * @remarks Has no effect when the pointer is already absent or the
     * controller is disconnected or disposed.
     */
    leave(): void;

    /**
     * Registers the presentation callback for a live UI target.
     *
     * @param targetId - Stable identifier unique within the controller.
     * @param presenter - Called with a context containing the command's
     * cancellation signal. Return true when the target was presented, or
     * false when it could not be shown. The callback may return a promise.
     * @param isAvailable - Optional synchronous check of the live target,
     * evaluated before presentation and before action invocation. Defaults
     * to true while this registration exists.
     * @returns An idempotent cleanup for this registration. Cleanup cancels
     * any pending command that targets it.
     * @throws An error for an invalid or duplicate identifier or a disposed
     * controller.
     */
    registerTarget(
        targetId: string,
        presenter: (context: {
            /**
             * Cancels pending presentation work when its command is interrupted.
             */
            readonly signal: AbortSignal;
        }) => boolean | Promise<boolean>,
        isAvailable?: () => boolean,
    ): () => void;

    /**
     * Registers a host action for a target.
     *
     * @param action - The action identifier, target identifier and handler.
     * @returns An idempotent cleanup for this action. Cleanup cancels any
     * pending invocation of it.
     * @throws An error for an invalid identifier, a duplicate action
     * identifier or a disposed controller.
     */
    registerAction(action: ICursorAction): () => void;

    /**
     * Presents a registered target and, on request, authorizes and invokes its
     * bound action.
     *
     * @param command - A show or invoke request for the active view.
     * @param signal - Optional cancellation from the caller.
     * @returns The observed result. Disconnection and disposal cancel pending
     * work. A non-true host policy denies invocation.
     * @remarks A new valid command cancels a pending presentation or policy
     * check. Once a handler starts, subsequent requests are unavailable until
     * it settles. The host owns recovery from an uncertain side effect.
     */
    run(command: CursorCommand, signal?: AbortSignal): Promise<CursorResult>;

    /**
     * Cancels guidance, withdraws the local pointer and releases the transport
     * subscription, registrations and subscribers.
     *
     * @throws Propagates host callback errors while still releasing controller
     * resources.
     * @remarks Disposal is idempotent. A final disconnected transition is
     * emitted to current subscribers when the controller was connected.
     */
    dispose(): void;
}
