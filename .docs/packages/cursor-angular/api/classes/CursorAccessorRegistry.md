# Class: CursorAccessorRegistry

Resolves the accessor classes selected for one application.

## Constructors

### Constructor

> **new CursorAccessorRegistry**(...`features`): `CursorAccessorRegistry`

Registers the classes supplied by the application features.

#### Parameters

##### features

...readonly `ICursorFeature`[]

The selected accessor features.

#### Returns

`CursorAccessorRegistry`

#### Throws

If two different classes claim the same tag.

## Methods

### bind()

#### Call Signature

> **bind**(`element`): `ICursorElementAccessor` \| `undefined`

Binds the configured accessor for the element's tag.

##### Parameters

###### element

`HTMLElement`

The mounted element to bind.

##### Returns

`ICursorElementAccessor` \| `undefined`

The accessor instance, if the host configured the tag.

#### Call Signature

> **bind**\<`TAccessor`\>(`element`, `expected`): `TAccessor`

Binds a known class and keeps its component-specific type.

##### Type Parameters

###### TAccessor

`TAccessor` *extends* `ICursorElementAccessor`

The expected bound accessor type.

##### Parameters

###### element

`HTMLElement`

The mounted element to bind.

###### expected

`ICursorAccessorClass`\<`TAccessor`\>

The class the host configured for this element.

##### Returns

`TAccessor`

The bound accessor instance.

##### Throws

If the class was not configured for the element's tag.

***

### get()

> **get**(`tagName`): `ICursorAccessorClass`\<`ICursorElementAccessor`\> \| `undefined`

Looks up a configured class by tag name.

#### Parameters

##### tagName

`string`

The local tag name of a DOM element.

#### Returns

`ICursorAccessorClass`\<`ICursorElementAccessor`\> \| `undefined`

The accessor class, if the host configured it.
