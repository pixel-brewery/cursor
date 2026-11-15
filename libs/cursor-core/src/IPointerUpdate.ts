import type { ICursorParticipant } from './ICursorParticipant.js';
import type { ICursorPosition } from './ICursorPosition.js';

interface IPointerUpdateScope {
    readonly viewId: string;
    readonly participant: ICursorParticipant;
    /** An increasing attachment generation when the host reuses a participant ID. */
    readonly generation: number;
    /** An increasing sequence number within one generation. */
    readonly sequence: number;
}

/**
 * A transient update scoped to one participant and active view.
 *
 * @public
 */
export type IPointerUpdate =
    | (IPointerUpdateScope & {
        readonly kind: 'move';
        readonly position: ICursorPosition;
        readonly targetId?: string;
    })
    | (IPointerUpdateScope & { readonly kind: 'leave' });
