# Interface: ICursorAction

An explicit host action bound to one registered target.

## Remarks

Register an action only if a host policy may authorize it. The
controller checks that policy immediately before calling the handler.

## Properties

### handler

> `readonly` **handler**: (`input`, `signal`) => `unknown`

Performs the action after presentation and authorization.

#### Parameters

##### input

`unknown`

Input from the invocation. The host must validate it before
applying any changes.

##### signal

`AbortSignal`

Cooperative cancellation for the current invocation.

#### Returns

`unknown`

The host operation, which may be a promise. Its value is ignored.

#### Throws

An error reported to the caller as a failed command. Retry and
recovery after an uncertain side effect belong to the host.

***

### id

> `readonly` **id**: `string`

Stable action identifier, unique within the controller.

***

### targetId

> `readonly` **targetId**: `string`

Identifier of the UI target that must remain available at execution.
