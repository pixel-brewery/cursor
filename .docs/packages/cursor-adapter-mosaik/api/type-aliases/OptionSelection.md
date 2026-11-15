# Type Alias: OptionSelection

> **OptionSelection** = \{ `kind`: `"next"`; \} \| \{ `kind`: `"value"`; `value`: `string`; \}

Select the next unselected, enabled option in list order or an option by its exact value.

## Union Members

### Type Literal

\{ `kind`: `"next"`; \}

#### kind

> `readonly` **kind**: `"next"`

Advance to the next enabled, unselected option, wrapping at the end of the list.

***

### Type Literal

\{ `kind`: `"value"`; `value`: `string`; \}

#### kind

> `readonly` **kind**: `"value"`

Select a specific option.

#### value

> `readonly` **value**: `string`

The exact value of the option to activate.
