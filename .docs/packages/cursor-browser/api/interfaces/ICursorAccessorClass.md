# Interface: ICursorAccessorClass\<TAccessor\>

A class that binds an accessor to a DOM element for a specific HTML tag.

## Type Parameters

### TAccessor

`TAccessor` *extends* [`ICursorElementAccessor`](ICursorElementAccessor.md) = [`ICursorElementAccessor`](ICursorElementAccessor.md)

The bound accessor, including its component-specific operations.

## Constructors

### Constructor

> **new ICursorAccessorClass**(`element`): `TAccessor`

Creates an accessor for one mounted element.

#### Parameters

##### element

`HTMLElement`

The DOM element for this accessor.

#### Returns

`TAccessor`

The bound accessor instance.

## Properties

### tagName

> `readonly` **tagName**: `string`

The element's local tag name, such as `mosaik-select` or `button`.
