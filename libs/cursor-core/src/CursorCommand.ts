/**
 * A presentation or action request for a registered target in the current view.
 *
 * @public
 */
export type CursorCommand =
    | { readonly kind: 'show'; readonly targetId: string }
    | {
        readonly kind: 'invoke';
        readonly targetId: string;
        readonly actionId: string;
        readonly input?: unknown;
    };
