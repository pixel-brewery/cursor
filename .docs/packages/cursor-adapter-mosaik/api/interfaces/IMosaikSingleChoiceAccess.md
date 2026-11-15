# Interface: IMosaikSingleChoiceAccess

Additional operations for a Mosaik dropdown that accepts one selected option.

## Methods

### selectOption()

> **selectOption**(`surface`, `selection`, `signal`): `Promise`\<`void`\>

Opens a dropdown, guides the assistant to an option and activates it.

#### Parameters

##### surface

`ICursorSurface`

The active surface that already presented the dropdown.

##### selection

[`MosaikOptionSelection`](../type-aliases/MosaikOptionSelection.md)

The allowed option value or next enabled option.

##### signal

`AbortSignal`

Cancels the action before the option can be activated.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the dropdown reports the expected selection.

#### Throws

When the dropdown or option becomes unavailable or selection cannot be verified.
