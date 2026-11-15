# Interface: ICursorTargetOptions

Identifies a Svelte target and the surface that owns it.

## Properties

### surface

> `readonly` **surface**: `ICursorSurface` \| `null`

The owning surface attachment, or null until the surface is mounted.

***

### targetId

> `readonly` **targetId**: `string`

Stable identifier used by assistant commands to find this target.
