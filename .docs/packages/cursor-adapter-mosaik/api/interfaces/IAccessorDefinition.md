# Interface: IAccessorDefinition

The custom element tag and the public members available to a decorated accessor.

## Properties

### events

> `readonly` **events**: readonly `string`[]

The event names the accessor can observe.

***

### methods

> `readonly` **methods**: readonly `string`[]

The public method names the accessor can invoke.

***

### properties

> `readonly` **properties**: readonly `string`[]

The public property names the accessor can read.

***

### readOnlyProperties

> `readonly` **readOnlyProperties**: readonly `string`[]

The subset of public properties that the accessor cannot write.

***

### tagName

> `readonly` **tagName**: `string`

The tag of the custom element accepted by the accessor.
