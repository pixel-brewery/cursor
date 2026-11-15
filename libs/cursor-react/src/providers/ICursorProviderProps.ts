// #region Imports

import type { ICursorFeature } from '@pixel-brewery/cursor-browser';
import type { ReactNode } from 'react';

// #endregion

/**
 * Configuration and content for a React Cursor scope.
 *
 * @public
 */
export interface ICursorProviderProps {
    /**
     * Features that supply the accessor classes used by this scope.
     *
     * @remarks Keep the array reference stable to reuse the registry across renders.
     */
    readonly features?: readonly ICursorFeature[];

    /** Content that can access the configured registry. */
    readonly children?: ReactNode;
}
