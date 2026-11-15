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

### guideTo()

> **guideTo**(`element`, `signal`): `Promise`\<`boolean`\>

Moves the assistant pointer to a live element in this surface's composed tree.

#### Parameters

##### element

`HTMLElement`

The rendered element for the next step of a guided interaction.

##### signal

`AbortSignal`

The signal from the guided action that owns the interaction.

#### Returns

`Promise`\<`boolean`\>

Whether the pointer arrived at the element.

#### Remarks

The pointer stays at the element until it becomes hidden, guidance is
cancelled or another presentation starts. This method does not activate the element.

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
