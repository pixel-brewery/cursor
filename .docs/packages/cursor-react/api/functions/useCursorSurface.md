# Function: useCursorSurface()

> **useCursorSurface**(`element`, `options`): `ICursorSurface` \| `null`

Attach the browser renderer to a committed React element.

## Parameters

### element

`HTMLElement` \| `null`

The element received from a React callback ref, or null until mounted.

### options

`Omit`\<`ICursorSurfaceOptions`, `"surface"`\>

The host controller and pointer options. The local pointer is hidden and
unanchored remote projection is enabled by default.

## Returns

`ICursorSurface` \| `null`

The current attachment for registering targets or null while it is unavailable.

## Remarks

Changes to the element, controller or pointer options dispose the previous attachment.
React also disposes the attachment on unmount. The host owns the controller.
