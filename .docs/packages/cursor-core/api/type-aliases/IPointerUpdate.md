# Type Alias: IPointerUpdate

> **IPointerUpdate** = `object` & (\{ `kind`: `"move"`; `position`: [`ICursorPosition`](../interfaces/ICursorPosition.md); `targetId?`: `string`; \} \| \{ `kind`: `"leave"`; \})

Transient pointer data scoped to one participant and active view.

## Type Declaration

### generation

> `readonly` **generation**: `number`

Positive safe integer identifying the participant attachment.
Increase it when reusing the participant identifier.

### participant

> `readonly` **participant**: [`ICursorParticipant`](../interfaces/ICursorParticipant.md)

Participant identity and display metadata verified by the host.

### sequence

> `readonly` **sequence**: `number`

Positive safe integer that increases within the generation.

### viewId

> `readonly` **viewId**: `string`

Identifier of the shared surface and resource.
