# Variable: cursorSurface

> `const` **cursorSurface**: `Action`\<`HTMLElement`, [`ICursorBindingOptions`](../interfaces/ICursorBindingOptions.md)\>

Attach the browser renderer when a Svelte action mounts.

## Remarks

Changing the controller or local pointer visibility disposes the previous attachment.
Destruction releases the renderer and reports `null` through `onAttachment`.
Replacing the callback ends the previous observation and reports the current attachment
to the new observer. The host owns the controller.
