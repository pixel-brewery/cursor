# Interface: ICursorControllerOptions

The scope and host capabilities for one mounted view.

## Properties

### authorize?

> `readonly` `optional` **authorize?**: (`command`, `signal`) => `boolean` \| `Promise`\<`boolean`\>

Authorizes an invocation against current host state.

#### Parameters

##### command

The request with the bound target, action and input.

###### actionId

`string`

Identifier of the host action to execute.

###### input?

`unknown`

Optional payload passed to the host for validation.

###### kind

`"invoke"`

Present the target, authorize the action and invoke its handler.

###### targetId

`string`

Target identifier that must match the action registration.

##### signal

`AbortSignal`

Cooperative cancellation while authorization is pending.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

True to allow the handler to run. False or an omitted policy
denies the action.

#### Throws

An error reported as a failed command. The handler is not called.

***

### generation?

> `readonly` `optional` **generation?**: `number`

Positive safe integer for this attachment. Supply increasing values
across reattachments when the host reuses a participant identifier.
Omission uses a process-local increasing value.

***

### participant

> `readonly` **participant**: [`ICursorParticipant`](ICursorParticipant.md)

Identity and display metadata of the participant authenticated by the host.

***

### transport

> `readonly` **transport**: [`ICursorTransport`](ICursorTransport.md)

Host-owned transport for authenticated pointer and lifecycle events.

***

### viewId

> `readonly` **viewId**: `string`

Identifier of the shared surface and resource. Updates for other views
are ignored.
