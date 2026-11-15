/**
 * An explicit host action bound to one registered target.
 *
 * @remarks Register an action only if a host policy may authorize it. The
 * controller checks that policy immediately before calling the handler.
 *
 * @public
 */
export interface ICursorAction {
    /**
     * Stable action identifier, unique within the controller.
     */
    readonly id: string;

    /**
     * Identifier of the UI target that must remain available at execution.
     */
    readonly targetId: string;

    /**
     * Performs the action after presentation and authorization.
     *
     * @param input - Input from the invocation. The host must validate it before
     * applying any changes.
     * @param signal - Cooperative cancellation for the current invocation.
     * @returns The host operation, which may be a promise. Its value is ignored.
     * @throws An error reported to the caller as a failed command. Retry and
     * recovery after an uncertain side effect belong to the host.
     */
    readonly handler: (input: unknown, signal: AbortSignal) => unknown;
}
