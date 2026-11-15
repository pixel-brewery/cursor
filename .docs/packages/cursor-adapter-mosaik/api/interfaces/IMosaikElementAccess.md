# Interface: IMosaikElementAccess

Operations on one live Mosaik element. The host decides which operations it authorizes.

## Methods

### activate()

> **activate**(`surface`, `signal`, `target?`): `Promise`\<`void`\>

Guide to and click an actionable part of the component.

#### Parameters

##### surface

`ICursorSurface`

Active cursor surface.

##### signal

`AbortSignal`

Guided action cancellation.

##### target?

`HTMLElement`

Optional explicit element inside the component when it has multiple controls.

#### Returns

`Promise`\<`void`\>

***

### invoke()

> **invoke**(`method`, ...`args`): `unknown`

Call a public method.

#### Parameters

##### method

`string`

Manifest method name.

##### args

...`unknown`[]

Method arguments.

#### Returns

`unknown`

The component's result, which may be a promise.

***

### observe()

> **observe**(`event`, `listener`): () => `void`

Observe a declared component event.

#### Parameters

##### event

`string`

Manifest event name.

##### listener

`EventListener`

Host listener.

#### Returns

A function that removes the listener.

() => `void`

***

### read()

> **read**(`property`): `unknown`

Read a public property declared by the component.

#### Parameters

##### property

`string`

Manifest property name.

#### Returns

`unknown`

The current value.

***

### write()

> **write**(`property`, `value`): `void`

Set a writable public property.

#### Parameters

##### property

`string`

Manifest property name.

##### value

`unknown`

Value accepted by the component.

#### Returns

`void`
