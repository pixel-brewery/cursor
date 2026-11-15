# Interface: ICursorSurfaceOptions

Host view and projection options for one browser or Electron attachment.

## Properties

### allowSurfaceProjection?

> `readonly` `optional` **allowSurfaceProjection?**: `boolean`

Whether remote moves can use normalized surface coordinates when they lack a known target.
Set to false when the sender and receiver use different surface layouts.

#### Default Value

`true`

***

### controller

> `readonly` **controller**: `ICursorController`

The host-owned controller for the attached view. Dispose the attachment when switching
controllers and dispose the controller according to its own lifetime.

***

### showLocalPointer?

> `readonly` `optional` **showLocalPointer?**: `boolean`

Whether the overlay also draws the local participant's labeled pointer. The controller
publishes local moves regardless of this setting.

#### Default Value

`false`

***

### surface

> `readonly` **surface**: `HTMLElement`

Connected DOM root that receives pointer input and contains registered targets.
