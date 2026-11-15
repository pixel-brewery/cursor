# Interface: IPointer

The latest visible position for a remote participant.

## Properties

### participant

> `readonly` **participant**: [`ICursorParticipant`](ICursorParticipant.md)

Authenticated participant identity and display information.

***

### position

> `readonly` **position**: [`ICursorPosition`](ICursorPosition.md)

Normalized position within the shared surface.

***

### targetId?

> `readonly` `optional` **targetId?**: `string`

Optional anchor that a receiver can resolve in its own layout.
