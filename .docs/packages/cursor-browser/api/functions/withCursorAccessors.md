# Function: withCursorAccessors()

> **withCursorAccessors**(...`accessors`): [`ICursorFeature`](../interfaces/ICursorFeature.md)

Selects the accessor classes to register in a Cursor application.

## Parameters

### accessors

...readonly [`ICursorAccessorClass`](../interfaces/ICursorAccessorClass.md)\<[`ICursorElementAccessor`](../interfaces/ICursorElementAccessor.md)\>[]

The individual accessor classes imported by the application.

## Returns

[`ICursorFeature`](../interfaces/ICursorFeature.md)

A feature accepted by a Cursor registry or framework provider.
