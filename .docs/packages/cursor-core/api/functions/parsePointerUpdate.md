# Function: parsePointerUpdate()

> **parsePointerUpdate**(`value`): [`IPointerUpdate`](../type-aliases/IPointerUpdate.md) \| `undefined`

Parses an untrusted wire value as a move or leave update.

## Parameters

### value

`unknown`

Untrusted update from the transport.

## Returns

[`IPointerUpdate`](../type-aliases/IPointerUpdate.md) \| `undefined`

A normalized copy when its fields are valid. Malformed values and
transport lifecycle events return undefined.

## Remarks

This validates the wire format. The host must authenticate the
participant and authorize view membership before forwarding an update.
