import type { ICursorAccessorClass } from './ICursorAccessorClass.js';

/**
 * A set of accessor classes selected by a host application.
 *
 * @public
 */
export interface ICursorFeature {
    /** Accessor classes to make available in the application's registry. */
    readonly accessors: readonly ICursorAccessorClass[];
}
