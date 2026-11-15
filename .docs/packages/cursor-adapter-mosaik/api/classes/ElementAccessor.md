# Abstract Class: ElementAccessor

Provides guided operations on one mounted custom element.

## Remarks

Decorate each concrete class with `@Accessor` to declare which element and members it accepts.

## Implements

- [`IMosaikElementAccess`](../interfaces/IMosaikElementAccess.md)

## Constructors

### Constructor

> **new ElementAccessor**(`element`): `ElementAccessor`

Creates an accessor for the mounted element.

#### Parameters

##### element

`HTMLElement`

The native element supplied by the host framework.

#### Returns

`ElementAccessor`

#### Throws

If the class is undecorated or the element is disconnected or has the wrong tag.

## Properties

### element

> `protected` `readonly` **element**: `HTMLElement`

The element managed by this instance.

## Accessors

### tagName

#### Get Signature

> **get** `static` **tagName**(): `string`

The tag of the mounted element accepted by this accessor class.

##### Returns

`string`

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

#### Implementation of

[`IMosaikElementAccess`](../interfaces/IMosaikElementAccess.md).[`activate`](../interfaces/IMosaikElementAccess.md#activate)

***

### bind()

> `static` **bind**\<`TAccessor`\>(`this`, `element`): `TAccessor`

Binds this accessor class to an element mounted by the host framework.

#### Type Parameters

##### TAccessor

`TAccessor` *extends* `ElementAccessor`

The concrete accessor class used by the caller.

#### Parameters

##### this

new (`element`) => `TAccessor`

##### element

`HTMLElement`

The mounted native custom element.

#### Returns

`TAccessor`

An instance of the concrete accessor class.

#### Throws

If the class is undecorated or the element is disconnected or has the wrong tag.

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

#### Implementation of

[`IMosaikElementAccess`](../interfaces/IMosaikElementAccess.md).[`invoke`](../interfaces/IMosaikElementAccess.md#invoke)

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

#### Implementation of

[`IMosaikElementAccess`](../interfaces/IMosaikElementAccess.md).[`observe`](../interfaces/IMosaikElementAccess.md#observe)

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

#### Implementation of

[`IMosaikElementAccess`](../interfaces/IMosaikElementAccess.md).[`read`](../interfaces/IMosaikElementAccess.md#read)

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

#### Implementation of

[`IMosaikElementAccess`](../interfaces/IMosaikElementAccess.md).[`write`](../interfaces/IMosaikElementAccess.md#write)
