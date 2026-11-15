# Interface: ICursorController

Tracks remote pointers and coordinates guided actions for one view.

## Remarks

The host owns participant authentication and action authorization.
Inbound pointer updates affect presentation only.

## Properties

### isConnected

> `readonly` **isConnected**: `boolean`

Whether the controller accepts pointer updates and guided commands.

#### Remarks

The controller starts connected and follows transport lifecycle
events. Disconnect and disposal suspend both capabilities.

***

### participant

> `readonly` **participant**: [`ICursorParticipant`](ICursorParticipant.md)

Immutable identity and display metadata for the local participant.

## Methods

### dispose()

> **dispose**(): `void`

Cancels guidance, withdraws the local pointer and releases the transport
subscription, registrations and subscribers.

#### Returns

`void`

#### Throws

Propagates host callback errors while still releasing controller
resources.

#### Remarks

Disposal is idempotent. A final disconnected transition is
emitted to current subscribers when the controller was connected.

***

### getPointers()

> **getPointers**(): readonly [`IPointer`](IPointer.md)[]

Reads the currently visible remote pointers.

#### Returns

readonly [`IPointer`](IPointer.md)[]

The immutable snapshot, empty when no remote pointer is visible.

***

### leave()

> **leave**(): `void`

Withdraws the local pointer from this view.

#### Returns

`void`

#### Throws

Propagates a synchronous transport publishing error.

#### Remarks

Has no effect when the pointer is already absent or the
controller is disconnected or disposed.

***

### move()

> **move**(`position`, `targetId?`): `void`

Publishes the local pointer's position to the host transport.

#### Parameters

##### position

[`ICursorPosition`](ICursorPosition.md)

Finite normalized surface coordinates between zero and
one inclusive.

##### targetId?

`string`

Optional registered UI anchor. A compatible receiving
surface can resolve it using its own layout.

#### Returns

`void`

#### Throws

Propagates a synchronous transport publishing error.

#### Remarks

Invalid values and calls after disconnection or disposal are
ignored.

***

### registerAction()

> **registerAction**(`action`): () => `void`

Registers a host action for a target.

#### Parameters

##### action

[`ICursorAction`](ICursorAction.md)

The action identifier, target identifier and handler.

#### Returns

An idempotent cleanup for this action. Cleanup cancels any
pending invocation of it.

() => `void`

#### Throws

An error for an invalid identifier, a duplicate action
identifier or a disposed controller.

***

### registerTarget()

> **registerTarget**(`targetId`, `presenter`, `isAvailable?`): () => `void`

Registers the presentation callback for a live UI target.

#### Parameters

##### targetId

`string`

Stable identifier unique within the controller.

##### presenter

(`context`) => `boolean` \| `Promise`\<`boolean`\>

Called with a context containing the command's
cancellation signal. Return true when the target was presented, or
false when it could not be shown. The callback may return a promise.

##### isAvailable?

() => `boolean`

Optional synchronous check of the live target,
evaluated before presentation and before action invocation. Defaults
to true while this registration exists.

#### Returns

An idempotent cleanup for this registration. Cleanup cancels
any pending command that targets it.

() => `void`

#### Throws

An error for an invalid or duplicate identifier or a disposed
controller.

***

### run()

> **run**(`command`, `signal?`): `Promise`\<[`CursorResult`](../type-aliases/CursorResult.md)\>

Presents a registered target and, on request, authorizes and invokes its
bound action.

#### Parameters

##### command

[`CursorCommand`](../type-aliases/CursorCommand.md)

A show or invoke request for the active view.

##### signal?

`AbortSignal`

Optional cancellation from the caller.

#### Returns

`Promise`\<[`CursorResult`](../type-aliases/CursorResult.md)\>

The observed result. Disconnection and disposal cancel pending
work. A non-true host policy denies invocation.

#### Remarks

A new valid command cancels a pending presentation or policy
check. Once a handler starts, subsequent requests are unavailable until
it settles. The host owns recovery from an uncertain side effect.

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Observes pointer snapshots and connection transitions.

#### Parameters

##### listener

(`pointers`) => `void`

Called synchronously with the current immutable pointer
snapshot after a change. Read [ICursorController.isConnected](#isconnected) in
the callback to distinguish a connection transition.

#### Returns

An idempotent unsubscribe function. Subscribing after disposal
returns a no-op cleanup.

() => `void`

#### Remarks

Use [ICursorController.getPointers](#getpointers) to read the initial
snapshot. Subscribing does not trigger an initial callback.
