# Interface: ICursorElementAccessor

The common action exposed by an accessor bound to a DOM element.

## Methods

### activate()

> **activate**(`surface`, `signal`, `target?`): `Promise`\<`void`\>

Guides the cursor to the element and activates it.

#### Parameters

##### surface

[`ICursorSurface`](ICursorSurface.md)

The active cursor surface.

##### signal

`AbortSignal`

Cancellation for this guided action.

##### target?

`HTMLElement`

An optional control inside the bound element to activate.

#### Returns

`Promise`\<`void`\>

A promise that resolves after activation.
