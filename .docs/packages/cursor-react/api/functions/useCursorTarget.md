# Function: useCursorTarget()

> **useCursorTarget**(`surface`, `targetId`, `element`): `void`

Register a target for the current React element and attachment.

## Parameters

### surface

`ICursorSurface` \| `null`

The active surface returned by the surface hook.

### targetId

`string`

The target identifier used by assistant commands.

### element

`HTMLElement` \| `null`

The committed DOM element, or null until mounted.

## Returns

`void`

## Remarks

Changes to the surface, identifier or element release the previous registration.
React releases the final registration on unmount.
