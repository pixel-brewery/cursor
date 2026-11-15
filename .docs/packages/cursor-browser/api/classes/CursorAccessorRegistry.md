# Class: CursorAccessorRegistry

Resolves the accessor classes selected for one application.

## Constructors

### Constructor

> **new CursorAccessorRegistry**(...`features`): `CursorAccessorRegistry`

Registers the classes supplied by the application features.

#### Parameters

##### features

...readonly [`ICursorFeature`](../interfaces/ICursorFeature.md)[]

The selected accessor features.

#### Returns

`CursorAccessorRegistry`

#### Throws

If two different classes claim the same tag.

## Methods

### bind()

#### Call Signature

> **bind**(`element`): [`ICursorElementAccessor`](../interfaces/ICursorElementAccessor.md) \| `undefined`

Binds the configured accessor for the element's tag.

##### Parameters

###### element

`HTMLElement`

The mounted element to bind.

##### Returns

[`ICursorElementAccessor`](../interfaces/ICursorElementAccessor.md) \| `undefined`

The accessor instance, if the host configured the tag.

#### Call Signature

> **bind**\<`TAccessor`\>(`element`, `expected`): `TAccessor`

Binds a known class and keeps its component-specific type.

##### Type Parameters

###### TAccessor

`TAccessor` *extends* [`ICursorElementAccessor`](../interfaces/ICursorElementAccessor.md)

The expected bound accessor type.

##### Parameters

###### element

`HTMLElement`

The mounted element to bind.

###### expected

[`ICursorAccessorClass`](../interfaces/ICursorAccessorClass.md)\<`TAccessor`\>

The class the host configured for this element.

##### Returns

`TAccessor`

The bound accessor instance.

##### Throws

If the class was not configured for the element's tag.

***

### get()

> **get**(`tagName`): [`ICursorAccessorClass`](../interfaces/ICursorAccessorClass.md)\<[`ICursorElementAccessor`](../interfaces/ICursorElementAccessor.md)\> \| `undefined`

Looks up a configured class by tag name.

#### Parameters

##### tagName

`string`

The local tag name of a DOM element.

#### Returns

[`ICursorAccessorClass`](../interfaces/ICursorAccessorClass.md)\<[`ICursorElementAccessor`](../interfaces/ICursorElementAccessor.md)\> \| `undefined`

The accessor class, if the host configured it.
