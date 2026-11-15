# Class: CursorSurfaceDirective

Attaches a browser renderer to an Angular host element.

## Remarks

Each renderer is disposed when the controller or its pointer options
change and when Angular destroys the directive. The caller owns the controller.

## Constructors

### Constructor

> **new CursorSurfaceDirective**(): `CursorSurfaceDirective`

Registers the attachment effect with Angular's browser render lifecycle.

#### Returns

`CursorSurfaceDirective`

## Properties

### attachment

> `readonly` **attachment**: `Signal`\<`ICursorSurface` \| `null`\>

The active browser attachment, or null before registration and after cleanup.

***

### cursorSurface

> `readonly` **cursorSurface**: `InputSignal`\<`Omit`\<`ICursorSurfaceOptions`, `"surface"`\>\>

The host controller and pointer options. By default the local pointer is hidden
and unanchored remote positions are projected into the receiving surface.
