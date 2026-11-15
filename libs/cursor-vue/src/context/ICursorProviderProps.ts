// #region Imports

import type { ICursorFeature } from '@pixel-brewery/cursor-browser';

// #endregion

/**
 * Configuration for the Vue Cursor provider.
 *
 * @public
 */
export interface ICursorProviderProps {
    /** Features that supply the accessor classes when the provider is mounted. */
    readonly features?: readonly ICursorFeature[];
}
