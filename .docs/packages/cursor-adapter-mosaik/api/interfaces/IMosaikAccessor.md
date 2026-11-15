# Interface: IMosaikAccessor\<TInteraction\>

The generated accessor exported by a component subpath.

## Type Parameters

### TInteraction

`TInteraction` *extends* `object` = `object`

Additional interaction capabilities inferred by the generator.

## Properties

### tagName

> `readonly` **tagName**: `string`

The Web Component tag recorded by the manifest.

## Methods

### bind()

> **bind**(`element`): [`IMosaikElementAccess`](IMosaikElementAccess.md) & `TInteraction`

Binds the accessor to an instance mounted by the host framework.

#### Parameters

##### element

`HTMLElement`

The mounted instance of this Web Component.

#### Returns

[`IMosaikElementAccess`](IMosaikElementAccess.md) & `TInteraction`

Operations for that element.
