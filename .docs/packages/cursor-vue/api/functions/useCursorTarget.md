# Function: useCursorTarget()

> **useCursorTarget**(`surface`, `targetId`, `element`): `void`

Keep a target registered for the active Vue attachment and rendered element.

## Parameters

### surface

`MaybeRefOrGetter`\<`ICursorSurface` \| `null`\>

The active surface returned by the surface composable.

### targetId

`MaybeRefOrGetter`\<`string`\>

The target identifier used by assistant commands.

### element

`MaybeRefOrGetter`\<`HTMLElement` \| `null`\>

The template ref or getter for the target element.

## Returns

`void`

## Remarks

Changes to the surface, identifier or element release the previous registration.
Vue releases the final registration when the component scope ends.
