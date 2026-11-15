# Class: CursorTargetDirective

Registers the host element with its nearest Cursor surface.

## Remarks

Angular releases the registration when the target identifier or surface
changes and when the directive is destroyed.

## Constructors

### Constructor

> **new CursorTargetDirective**(): `CursorTargetDirective`

Resolves the owning surface and registers the target after rendering.

#### Returns

`CursorTargetDirective`

## Properties

### cursorTarget

> `readonly` **cursorTarget**: `InputSignal`\<`string`\>

Stable identifier used by assistant commands to resolve this element.
