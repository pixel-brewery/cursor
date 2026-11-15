# Cursor Browser

The browser package attaches a Cursor controller to a DOM surface. It publishes normalized local pointer positions and displays other participants. A host can register live elements for target-aware pointer projection and assistant guidance. The same package runs in browsers and Electron renderers.

Set `data-cursor-style` on the attached DOM element to `outline`, `pill`, `square` or `square-outline`. It can change while attached. Pass a color from the exported `cursorPalette` in a participant identity to use the reference palette. See the [host integration guide](../../.docs/guides/integrate-cursor.md#set-the-pointer-appearance) for each style.

## Attach a surface

Supply the controller for the current view and a connected element that contains its targets. The returned attachment owns the overlay, pointer listeners, observers and target registrations.

```ts
import { attachCursorSurface } from '@pixel-brewery/cursor-browser';

const binding = attachCursorSurface({ surface, controller });
const releaseSettings = binding.registerTarget('settings', settingsButton);

// On removal of the control or the view:
releaseSettings();
binding.dispose();
```

The overlay normally draws only remote participant markers and the assistant. Set `showLocalPointer` to add a labeled marker for the local participant. Set `allowSurfaceProjection` to false when clients have different surface layouts and should use only registered target positions.

The host owns the controller and any action handlers. Disposing an attachment removes its overlay and target registrations without disposing the host controller. Disconnect clears rendered pointers and cancels guidance. Pointer updates resume when the controller reconnects.

See the [host integration guide](../../.docs/guides/integrate-cursor.md) for transport, authorization and framework adapters, or open the [browser API reference](../../.docs/packages/cursor-browser/api/index.md).
