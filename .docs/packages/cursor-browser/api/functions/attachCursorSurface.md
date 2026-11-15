# Function: attachCursorSurface()

> **attachCursorSurface**(`options`): [`ICursorSurface`](../interfaces/ICursorSurface.md)

Mounts the shared pointer renderer on a connected browser or Electron surface.

## Parameters

### options

[`ICursorSurfaceOptions`](../interfaces/ICursorSurfaceOptions.md)

The host surface, view controller and optional projection settings.

## Returns

[`ICursorSurface`](../interfaces/ICursorSurface.md)

An attachment that owns overlay cleanup and target registration.

## Remarks

The overlay observes the attached view without handling pointer input or taking focus
from host controls. The host owns the lifetime of the returned attachment and the supplied
controller. Dispose the attachment before a view change or unmount.

## Throws

If the surface has no connected browser document with a body and a window.

## Example

```ts
const binding = attachCursorSurface({ surface, controller });
const releaseSettings = binding.registerTarget('settings', settingsButton);
releaseSettings();
binding.dispose();
```
