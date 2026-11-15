# Type Alias: CursorResult

> **CursorResult** = \{ `status`: `"shown"` \| `"invoked"` \| `"denied"` \| `"unavailable"` \| `"cancelled"`; \} \| \{ `error`: `unknown`; `status`: `"failed"`; \}

Observed outcome of a guided command.

## Union Members

### Type Literal

\{ `status`: `"shown"` \| `"invoked"` \| `"denied"` \| `"unavailable"` \| `"cancelled"`; \}

#### status

> `readonly` **status**: `"shown"` \| `"invoked"` \| `"denied"` \| `"unavailable"` \| `"cancelled"`

Completion or refusal without an exception.

##### Remarks

Shown means the target was presented. Invoked means the
authorized handler completed. Denied means policy did not allow
the invocation. Unavailable means a registration, live target or
execution slot was missing. Cancelled means the request stopped
before completion.

***

### Type Literal

\{ `error`: `unknown`; `status`: `"failed"`; \}

#### error

> `readonly` **error**: `unknown`

Original exception for host-side diagnostics. Host code decides
what to report to users and how to recover.

#### status

> `readonly` **status**: `"failed"`

Presentation, authorization or action execution raised an error.
