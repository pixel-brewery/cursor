# Function: selectMosaikOption()

> **selectMosaikOption**(`surface`, `element`, `selection`, `signal`): `Promise`\<`void`\>

Opens a Mosaik select and guides the assistant to the option before activating it.
Call from a host-authorized action registered for the select.

## Parameters

### surface

`ICursorSurface`

The active surface that already presented the select.

### element

`HTMLElement`

The mounted Mosaik select.

### selection

[`MosaikOptionSelection`](../type-aliases/MosaikOptionSelection.md)

The allowed option value or next enabled option.

### signal

`AbortSignal`

Cancels the action before an option can be activated.

## Returns

`Promise`\<`void`\>

A promise that resolves once the select reports the expected selection.

## Throws

When the select or option becomes unavailable or the selection cannot be verified.
