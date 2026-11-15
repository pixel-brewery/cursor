// #region Imports

import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { CursorAccessorRegistry, type ICursorFeature } from '@pixel-brewery/cursor-browser';

// #endregion

/**
 * Configures the shared Cursor accessor registry for an Angular environment injector.
 * Use `inject(CursorAccessorRegistry)` within that environment to resolve registered accessors.
 *
 * @param features - Features that contribute accessor classes, such as `withCursorAccessors`.
 * @returns Environment providers to add to the application or route configuration.
 *
 * @public
 */
export function provideCursor(...features: readonly ICursorFeature[]): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: CursorAccessorRegistry,
            useFactory: () => new CursorAccessorRegistry(...features),
        },
    ]);
}
