import type { ICursorElementAccessor } from './ICursorElementAccessor.js';

/**
 * A class that binds an accessor to a DOM element for a specific HTML tag.
 *
 * @typeParam TAccessor - The bound accessor, including its component-specific operations.
 * @public
 */
export interface ICursorAccessorClass<TAccessor extends ICursorElementAccessor = ICursorElementAccessor> {
    /** The element's local tag name, such as `mosaik-select` or `button`. */
    readonly tagName: string;

    /**
     * Creates an accessor for one mounted element.
     *
     * @param element - The DOM element for this accessor.
     * @returns The bound accessor instance.
     */
    new (element: HTMLElement): TAccessor;
}
