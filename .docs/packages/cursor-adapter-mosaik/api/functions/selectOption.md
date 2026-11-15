# Function: selectOption()

> **selectOption**(`dropdown`, `surface`, `selection`, `signal`): `Promise`\<`void`\>

Guides the cursor to an option and selects it through the native dropdown interaction.

## Parameters

### dropdown

[`IOptionDropdown`](../interfaces/IOptionDropdown.md)

A mounted control that exposes the option dropdown contract.

### surface

`ICursorSurface`

The surface that guides the cursor to the option.

### selection

[`OptionSelection`](../type-aliases/OptionSelection.md)

The requested option by value or list order.

### signal

`AbortSignal`

Cancels the action before activation.

## Returns

`Promise`\<`void`\>

A promise that resolves once the option is selected.

## Remarks

Already selected options are left selected. If this action opens the dropdown,
it requests closure at the end. The control retains its own selection and closing policy.

## Throws

If the dropdown or option is unavailable or the selection cannot be verified.
