/**
 * A point in a shared surface, normalized to the interval from zero to one.
 *
 * @public
 */
export interface ICursorPosition {
    /**
     * Horizontal coordinate from the left edge of the surface.
     */
    readonly x: number;

    /**
     * Vertical coordinate from the top edge of the surface.
     */
    readonly y: number;
}
