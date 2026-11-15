# Type Alias: CursorCommand

> **CursorCommand** = \{ `kind`: `"show"`; `targetId`: `string`; \} \| \{ `actionId`: `string`; `input?`: `unknown`; `kind`: `"invoke"`; `targetId`: `string`; \}

Request to present a registered target or invoke its bound host action.

## Union Members

### Type Literal

\{ `kind`: `"show"`; `targetId`: `string`; \}

#### kind

> `readonly` **kind**: `"show"`

Present the target as a visual guide.

#### targetId

> `readonly` **targetId**: `string`

Target identifier from the current view's registrations.

***

### Type Literal

\{ `actionId`: `string`; `input?`: `unknown`; `kind`: `"invoke"`; `targetId`: `string`; \}

#### actionId

> `readonly` **actionId**: `string`

Identifier of the host action to execute.

#### input?

> `readonly` `optional` **input?**: `unknown`

Optional payload passed to the host for validation.

#### kind

> `readonly` **kind**: `"invoke"`

Present the target, authorize the action and invoke its handler.

#### targetId

> `readonly` **targetId**: `string`

Target identifier that must match the action registration.

## Remarks

Requests address the controller's active view. Only an invoke
request enters the host action policy.
