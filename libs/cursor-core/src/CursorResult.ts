/**
 * The observed outcome of a guided command.
 *
 * @public
 */
export type CursorResult =
    | { readonly status: 'shown' | 'invoked' | 'denied' | 'unavailable' | 'cancelled' }
    | { readonly status: 'failed'; readonly error: unknown };
