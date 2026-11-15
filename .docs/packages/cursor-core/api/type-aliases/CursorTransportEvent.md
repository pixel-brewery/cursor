# Type Alias: CursorTransportEvent

> **CursorTransportEvent** = [`IPointerUpdate`](IPointerUpdate.md) \| \{ `kind`: `"connected"`; \} \| \{ `kind`: `"disconnected"`; \} \| \{ `actorId`: `string`; `generation?`: `number`; `kind`: `"departure"`; `viewId`: `string`; \}

An authenticated update or lifecycle event supplied by the host transport.

## Union Members

[`IPointerUpdate`](IPointerUpdate.md)

***

### Type Literal

\{ `kind`: `"connected"`; \}

#### kind

> `readonly` **kind**: `"connected"`

Activate delivery and guided commands after a disconnect.

***

### Type Literal

\{ `kind`: `"disconnected"`; \}

#### kind

> `readonly` **kind**: `"disconnected"`

Clear visible pointers and cancel pending guidance until reconnect.

***

### Type Literal

\{ `actorId`: `string`; `generation?`: `number`; `kind`: `"departure"`; `viewId`: `string`; \}

#### actorId

> `readonly` **actorId**: `string`

Host-authenticated participant identifier.

#### generation?

> `readonly` `optional` **generation?**: `number`

Retired attachment generation. Omit only when the host
permanently retires the participant identifier.

#### kind

> `readonly` **kind**: `"departure"`

Remove the participant and reject subsequent updates from the
departed generation.

#### viewId

> `readonly` **viewId**: `string`

View the participant left.
