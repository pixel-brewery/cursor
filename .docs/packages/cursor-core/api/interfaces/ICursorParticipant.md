# Interface: ICursorParticipant

Display information for a participant authenticated by the host transport.

## Properties

### color?

> `readonly` `optional` **color?**: `string`

Host-approved hexadecimal color in six-digit RGB notation. Omit it to
let the renderer choose a color.

***

### id

> `readonly` **id**: `string`

Stable identifier within the host's pointer stream.

***

### label

> `readonly` **label**: `string`

Non-blank display label for the participant.

***

### source?

> `readonly` `optional` **source?**: `"human"` \| `"assistant"`

Actor category. Renderers treat an omitted source as human.
