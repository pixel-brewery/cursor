# Variable: cursorTarget

> `const` **cursorTarget**: `Action`\<`HTMLElement`, [`ICursorTargetOptions`](../interfaces/ICursorTargetOptions.md)\>

Register a rendered element as an assistant target for its Svelte action lifetime.

## Remarks

A null surface suspends registration. Changing the target or its surface releases the previous registration.
