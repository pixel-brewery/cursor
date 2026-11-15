# Interface: IOptionDropdown

The native dropdown contract used by the guided option selection action.

## Extends

- `HTMLElement`

## Properties

### disabled

> `readonly` **disabled**: `boolean`

Whether the dropdown cannot be changed.

***

### isDropDownOpen

> `readonly` **isDropDownOpen**: `boolean`

Whether the dropdown is open.

***

### items

> `readonly` **items**: readonly [`ISelectableOption`](ISelectableOption.md)[]

The options in display order.

***

### selectedItem

> `readonly` **selectedItem**: [`ISelectableOption`](ISelectableOption.md) \| `null`

The current option used as the starting point for next-option navigation.

## Methods

### close()

> **close**(): `void`

Requests that the dropdown close according to the control's policy.

#### Returns

`void`

***

### open()

> **open**(): `void`

Opens the dropdown.

#### Returns

`void`
