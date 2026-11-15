# Function: useCursorSurface()

> **useCursorSurface**(`element`, `options`): `Readonly`\<`ShallowRef`\<`ICursorSurface` \| `null`\>\>

Attach the renderer to a Vue template ref after mounting.

## Parameters

### element

`MaybeRefOrGetter`\<`HTMLElement` \| `null`\>

The mounted element or a getter that resolves it.

### options

`MaybeRefOrGetter`\<`Omit`\<`ICursorSurfaceOptions`, `"surface"`\>\>

The host controller and pointer options. The local pointer is hidden and
unanchored remote projection is enabled by default.

## Returns

`Readonly`\<`ShallowRef`\<`ICursorSurface` \| `null`\>\>

A shallow readonly ref to the current attachment, or null before mounting and during cleanup.

## Remarks

Rendered element or option changes release the previous attachment. Vue also disposes
the attachment when the component scope ends. The host owns the controller.
