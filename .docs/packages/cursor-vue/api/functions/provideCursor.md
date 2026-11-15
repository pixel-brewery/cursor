# Function: provideCursor()

> **provideCursor**(...`features`): `CursorAccessorRegistry`

Configures the accessor registry shared by the current Vue component's descendants.
Call during setup with the features for this subtree.

## Parameters

### features

...readonly `ICursorFeature`[]

Cursor features to install in the registry.

## Returns

`CursorAccessorRegistry`

The registry provided to the subtree.
