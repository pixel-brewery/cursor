# Function: useCursorAccessorRegistry()

> **useCursorAccessorRegistry**(): `CursorAccessorRegistry`

Reads the accessor registry from the nearest `CursorProvider`.

## Returns

`CursorAccessorRegistry`

The registry for the current Cursor scope.

## Throws

If the calling component has no ancestor `CursorProvider`.
