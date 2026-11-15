# Function: provideCursor()

> **provideCursor**(...`features`): `EnvironmentProviders`

Configures the shared Cursor accessor registry for an Angular environment injector.
Use `inject(CursorAccessorRegistry)` within that environment to resolve registered accessors.

## Parameters

### features

...readonly `ICursorFeature`[]

Features that contribute accessor classes, such as `withCursorAccessors`.

## Returns

`EnvironmentProviders`

Environment providers to add to the application or route configuration.
