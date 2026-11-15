# Interface: ICursorSurface

A mounted cursor overlay and its target registrations.

## Methods

### dispose()

> **dispose**(): `void`

Withdraws the local pointer, removes the overlay and releases subscriptions, listeners,
observers and target registrations. Cancels an active presentation.

#### Returns

`void`

#### Remarks

Call on unmount or before replacing the host view or controller. Repeated calls
have no effect. The caller continues to own the controller.

***

### registerTarget()

> **registerTarget**(`id`, `element`): () => `void`

Registers a live element under its stable host target ID.

#### Parameters

##### id

`string`

The unique target ID supplied to assistant commands and anchored pointer events.

##### element

`HTMLElement`

A rendered element within the attached surface.

#### Returns

An idempotent cleanup function for this registration. Releasing an active target
cancels its presentation and removes the assistant marker.

() => `void`

#### Throws

If the element lies outside the surface, the attachment or controller is
disposed, or the identifier is invalid or already registered on the controller.
