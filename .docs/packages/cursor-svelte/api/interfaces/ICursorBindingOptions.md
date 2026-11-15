# Interface: ICursorBindingOptions

Options for attaching the Svelte surface and observing its lifetime.

## Remarks

The local pointer stays hidden unless `showLocalPointer` is enabled.

## Extends

- `Omit`\<`ICursorSurfaceOptions`, `"surface"`\>

## Properties

### allowSurfaceProjection?

> `readonly` `optional` **allowSurfaceProjection?**: `boolean`

Whether remote moves can use normalized surface coordinates when they lack a known target.
Set to false when the sender and receiver use different surface layouts.

#### Default Value

`true`

#### Inherited from

`Omit.allowSurfaceProjection`

***

### controller

> `readonly` **controller**: `ICursorController`

The host-owned controller for the attached view. Dispose the attachment when switching
controllers and dispose the controller according to its own lifetime.

#### Inherited from

`Omit.controller`

***

### onAttachment

> `readonly` **onAttachment**: (`attachment`) => `void`

Receives the current attachment when observation starts and `null` when it ends.

#### Parameters

##### attachment

`ICursorSurface` \| `null`

The current browser attachment or `null` during cleanup.

#### Returns

`void`

***

### showLocalPointer?

> `readonly` `optional` **showLocalPointer?**: `boolean`

Whether the overlay also draws the local participant's labeled pointer. The controller
publishes local moves regardless of this setting.

#### Default Value

`false`

#### Inherited from

`Omit.showLocalPointer`
