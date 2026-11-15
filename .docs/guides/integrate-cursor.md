# Integrate Cursor in a host application

Create one controller per mounted view and attach the browser renderer to a connected DOM element. The controller owns transient pointer state and coordinates guided commands. The host supplies identity, transport, view membership and authorization. An Electron renderer uses the same browser API inside its window.

## Connect identity and transport

- Choose a `viewId` for the rendered resource. Two views share pointers when their hosts route the same view ID. When navigation changes the resource, dispose the old controller and create one for the new view.
- Supply a stable participant ID and a display label. The host authenticates the participant and verifies view membership before relaying an update. The core validates the wire shape. It supports labels and IDs up to 128 characters, normalized coordinates from 0 to 1, and optional colors expressed as six-digit hexadecimal RGB.
- Publish `move` and `leave` events through `ICursorTransport`. A move carries a position and may include a stable target ID. Sequence increases within each attachment generation. Supply increasing generation values when reusing a participant ID across attachments, especially across processes. The implicit generation is allocated in the current process.
- Pass received values to the transport subscriber. The controller ignores messages for another view, self echoes and stale generation or sequence values. `leave` withdraws a pointer while permitting a later move. `departure` withdraws it and retires its generation. Departure without a generation retires the participant ID for the controller’s lifetime.
- Deliver `disconnected` on transport loss and `connected` after subscriptions are usable again. Disconnect clears the pointers and cancels pending guidance. New updates must be fresher than the last accepted updates for those participants. The host owns reconnect delays and any relay policy.

See [ICursorTransport](../packages/cursor-core/api/interfaces/ICursorTransport.md), [CursorTransportEvent](../packages/cursor-core/api/type-aliases/CursorTransportEvent.md) and [IPointerUpdate](../packages/cursor-core/api/type-aliases/IPointerUpdate.md) for signatures and wire fields.

## Register a target and its action

Use the same stable target ID on all layouts that represent the same control. The receiving view projects a known anchor onto its own control geometry. The renderer clips the anchor to the visible part of the control and updates it after scrolling and resizing. Set `allowSurfaceProjection: false` when layouts differ and only registered target positions should be shown. The default is `true`. Set `showLocalPointer: true` to show a label for the local pointer alongside remote pointers. The local label is hidden by default.

```ts
import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import { createCursorController, type ICursorControllerOptions } from '@pixel-brewery/cursor-core';

export function mountSettings(
    options: Pick<ICursorControllerOptions, 'viewId' | 'participant' | 'transport' | 'generation'>,
    surface: HTMLElement,
    settingsButton: HTMLButtonElement,
    canOpenSettings: () => boolean,
    openSettings: () => void,
) {
    const controller = createCursorController({
        ...options,
        authorize: (command) =>
            command.targetId === 'settings' &&
            command.actionId === 'open-settings' &&
            command.input === undefined &&
            canOpenSettings(),
    });
    const attachment = attachCursorSurface({
        surface,
        controller,
        allowSurfaceProjection: false,
    });
    const unregisterTarget = attachment.registerTarget('settings', settingsButton);
    const unregisterAction = controller.registerAction({
        id: 'open-settings',
        targetId: 'settings',
        handler: openSettings,
    });

    return {
        show: (signal?: AbortSignal) =>
            controller.run({ kind: 'show', targetId: 'settings' }, signal),
        open: (signal?: AbortSignal) =>
            controller.run(
                { kind: 'invoke', targetId: 'settings', actionId: 'open-settings' },
                signal,
            ),
        dispose() {
            unregisterAction();
            unregisterTarget();
            attachment.dispose();
            controller.dispose();
        },
    };
}
```

Handle the result before displaying action feedback. `shown` means presentation completed. `invoked` means the approved handler completed. `unavailable` covers a missing or hidden target, an invalid binding or a handler already running. `denied` means the host did not grant permission. `cancelled` covers aborted work before invocation or a disconnected view. `failed` carries the cause for host-side reporting. A cancellation after a handler has started is cooperative. Use the signal passed to the handler when the underlying operation supports cancellation and use the host’s own policy for side effects with uncertain results.

## Choose a framework adapter

| Framework | Bind the surface                                                                                           | Bind a target                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Angular   | Import the standalone `CursorSurfaceDirective` and bind `[cursorSurface]="options"` to a connected host.   | Import `CursorTargetDirective` and bind `[cursorTarget]="targetId"` on a descendant.                     |
| React     | Pass the element from a callback ref to `useCursorSurface(element, options)`.                              | Call `useCursorTarget(attachment, targetId, targetElement)` with the target’s callback ref element.      |
| Vue       | Pass the template element ref and options or an options getter to `useCursorSurface`.                      | Pass the returned shallow readonly ref and the target element ref to `useCursorTarget`.                  |
| Svelte    | Use `use:cursorSurface={{ ...options, onAttachment }}` and retain the attachment received by the callback. | Use `use:cursorTarget={{ surface: attachment, targetId }}`. The callback receives `null` during cleanup. |

All adapters take the host controller plus the same pointer options and release obsolete attachments after tracked inputs change. The host owns controller disposal. The [API reference](../README.md#runtime-entry-points) documents the signatures.
