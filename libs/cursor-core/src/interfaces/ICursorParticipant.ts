/**
 * Display information for a participant authenticated by the host transport.
 *
 * @public
 */
export interface ICursorParticipant {
    /**
     * Stable identifier within the host's pointer stream.
     */
    readonly id: string;

    /**
     * Non-blank display label for the participant.
     */
    readonly label: string;

    /**
     * Host-approved hexadecimal color in six-digit RGB notation. Omit it to
     * let the renderer choose a color.
     */
    readonly color?: string;

    /**
     * Actor category. Renderers treat an omitted source as human.
     */
    readonly source?: 'human' | 'assistant';
}
