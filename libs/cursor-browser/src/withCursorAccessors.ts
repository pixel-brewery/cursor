import type { ICursorAccessorClass } from './interfaces/ICursorAccessorClass.js';
import type { ICursorFeature } from './interfaces/ICursorFeature.js';

/**
 * Selects the accessor classes to register in a Cursor application.
 *
 * @param accessors - The individual accessor classes imported by the application.
 * @returns A feature accepted by a Cursor registry or framework provider.
 * @public
 */
export function withCursorAccessors(...accessors: readonly ICursorAccessorClass[]): ICursorFeature {
    return { accessors };
}
