/**
 * An explicit action exposed by the host for one registered target.
 *
 * @public
 */
export interface ICursorAction {
    readonly id: string;
    readonly targetId: string;
    /** The host validates the input and controls the side effects of this operation. */
    readonly handler: (input: unknown, signal: AbortSignal) => unknown;
}
