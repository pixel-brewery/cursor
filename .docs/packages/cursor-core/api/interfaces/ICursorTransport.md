# Interface: ICursorTransport

Connects a controller to a host-authenticated delivery channel.

## Remarks

Authenticate participants and authorize view membership before
forwarding updates. Cursor validates incoming data and isolates its view.

## Methods

### publish()

> **publish**(`update`): `void`

Publishes a pointer update for the local participant.

#### Parameters

##### update

[`IPointerUpdate`](../type-aliases/IPointerUpdate.md)

The move or leave event within the controller's view.

#### Returns

`void`

#### Throws

A synchronous transport failure when the update cannot be sent.

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Subscribes to incoming wire data and transport lifecycle events.

#### Parameters

##### listener

(`event`) => `void`

The callback that receives each incoming wire value.
Emit a connected event after reconnecting to resume delivery.

#### Returns

An unsubscribe operation. The controller calls it on disposal.

() => `void`
