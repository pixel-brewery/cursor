/**
 * Display information for a participant authenticated by the host transport.
 *
 * @public
 */
export interface ICursorParticipant {
    readonly id: string;
    readonly label: string;
    /** A host-approved hexadecimal color. */
    readonly color?: string;
    /** Human is the default when the transport omits the source. */
    readonly source?: 'human' | 'assistant';
}
