# Cursor runtime implementation plan

## First usable scenario

Open the same reference view in two application instances. Moving the pointer in either instance displays a named human pointer in the other. In the first instance, send an assistant a request to show the settings control. A distinct AI pointer moves to the control. Send a second request to open it. The pointer reaches the control and the application invokes its registered action. The settings panel opens through the same application handler as a local click.

Run the scenario first across two browser tabs. Repeat it across a browser tab and an Electron window with the same renderer bundle. The reference chat interprets German input with a local language model. The HTTP completion fixture makes the same integration reproducible in CI. The [reference chat guide](guides/reference-chat.md) describes both verification paths.

## Package boundaries

| Owner                                                                               | Responsibility                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `libs/cursor-core`                                                                  | Define view scope, pointer events, transport and action contracts. Validate incoming data, order updates, expose state subscriptions and coordinate show and invoke requests. Keep imports safe in environments without browser globals. |
| `libs/cursor-browser`                                                               | Bind a controller to a rendered surface, capture local pointer input, resolve target geometry and render labelled pointers. Own listeners, observers, animation and cleanup. Use this library from web and Electron renderers.           |
| `libs/cursor-angular`, `libs/cursor-react`, `libs/cursor-vue`, `libs/cursor-svelte` | Connect the browser controller to each framework’s registration and destruction lifecycle. Keep the UI framework as a peer dependency.                                                                                                   |
| `apps/reference`                                                                    | Own a fixture view, a minimal realtime relay for the demonstration and an action that opens a settings panel. Run the same fixture in browser and Electron with dedicated launch entry points.                                           |
| Consuming application                                                               | Authenticate participants on its existing realtime connection. Supply view scope, participant display data, assistant intent and authorization. Own all business side effects and determine which targets and handlers it exposes.       |

Use the workspace’s Native ESM and strict TypeScript configuration. Framework adapters depend on the browser library, which depends on the core. The core and browser libraries expose explicit entry points and use explicit setup calls to create state or attach listeners. Add English TSDoc to public contracts as they land. Document packages and sample commands when the corresponding code can run from a fresh checkout.

## Integration contracts

The core exports these contracts through the package root. The host supplies identity, scope, transport and action authorization.

| Contract            | Data and behavior                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| View scope          | An opaque `viewId` supplied by the host. The same identifier means that participants are viewing the same surface and resource. Generation changes on reattachment or a change of view.                |
| Participant         | A host-authenticated connection or actor ID and display label. The host may supply an approved color. Human and AI sources are distinct in the render state.                                           |
| Pointer update      | A `move` or `leave` event scoped by `viewId` and actor ID, with a generation and increasing sequence within that generation. A `move` carries a surface position and may carry a registered target ID. |
| Host transport      | Publish local pointer events and subscribe to verified remote pointer events and connection state. The host supplies routing and authorization. The controller releases the subscription on disposal.  |
| Target registration | A stable target ID resolves to an element in the active surface. One live registration owns an ID. Registration returns a cleanup operation and lasts as long as the rendered target does.             |
| Action registration | An explicit action ID, target ID and typed handler. The host validates the input and authorizes the action against current application state.                                                          |
| Assistant command   | A `show` request names one target. An `invoke` request names a target, its registered action and optional typed input. Both run under the current view generation and support cancellation.            |

Controller state is transient. Closing a view, disconnecting or disposing the controller removes its visible pointers. An authorized handler can create normal application changes through the host’s existing persistence and audit flow.

## Pointer and action flow

1. **Attach the view.** The application mounts a surface and supplies its `viewId`, transport and local participant. The browser layer creates a noninteractive overlay scoped to that surface and observes local geometry. The overlay itself leaves pointer events and focus with the host UI.
2. **Capture and send.** Convert local pointer movement to coordinates within the surface. Coalesce movement updates before handing them to the transport so that newer positions replace queued positions. Emit a `leave` event when the pointer exits the surface. Associate a registered target ID when that target is the meaningful point of reference.
3. **Receive and render.** Validate event kinds and finite coordinates at ingress. Use the active view, actor identity and sequence to reject stale events and filter self echoes. Resolve a known target locally to accommodate different layouts. Otherwise project the surface coordinates only when both views use the same coordinate system. Refresh rendering as the receiving viewport resizes or scrolls. Keep the latest state per actor and remove the actor’s pointer on leave or a host-reported departure.
4. **Show the target.** Scope the assistant command to one active view and resolve its live target. Bring the target into view if needed and move the AI pointer to the current target geometry. The pointer animation follows the reduced-motion setting and stops when the view or target changes.
5. **Invoke the application action.** Check that the registered action still matches the live target and recheck authorization immediately before invoking it. Return an explicit result for shown, invoked, denied, unavailable, cancelled or failed. Execute a handler once per accepted invocation and leave retries of an uncertain result to the host’s action policy.
6. **Release the view.** Unsubscribe from the transport, remove listeners and observers, cancel active animations and requests, then clear the overlay. A late transport delivery or assistant command from the previous attachment cannot update the next view.

In the reference application, the model returns one validated suggestion. The view resolves `show-settings` to a registered target and `open-settings` to its authorized handler. The `none` suggestion returns the conversational reply alone. Incoming pointer updates remain on the rendering path. The renderer reports the observed result from the controller after guidance.

## Framework integration

Ship one browser implementation. Each framework entry point accepts the same scope and transport and provides target registration for its component model. Use a directive with destruction handling for Angular, a hook with cleanup for React, a composable with scope disposal for Vue and an action with destroy handling for Svelte. Verify that replacing the surface or its inputs releases the previous registration. Keep all DOM access behind mount so that framework imports can be used during server rendering.

The reference view uses Mosaik Soho and the native Web Component API. The local 0.1.205 catalog supplied the authoring rules, native framework guide, tokens, component contracts and anatomy. `template-issue-tracker` and `recipe-account-settings-panel` informed the settings layout. The smaller fixture uses Card for its two areas, Button for actions and Message for connection and assistant feedback. These map directly to the installed 0.1.205 foundation and theme packages. Branding assets stay outside the runtime API.

## Delivery order

1. Implement the core types, transport boundary and lifecycle. Verify validated input, per-actor ordering, scope changes and action authorization in focused tests.
2. Implement the browser renderer and target registration. Validate input capture, geometry updates and cleanup in the reference surface.
3. Connect the reference relay and chat. Run the two-tab scenario and repeat across browser and Electron using the shared renderer.
4. Add the four framework adapters. Exercise the same mount, registration, rerender and teardown contract in each framework.
5. Document observed behavior, public imports and runnable commands alongside the [runtime verification guide](README.md#runtime-verification).

## Acceptance

| Scenario                                       | Required observation                                                                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Two browser tabs on the same view              | A moving local pointer appears as a human pointer in the other tab, then disappears on leave or disconnect.                                                        |
| Browser and Electron at different window sizes | Both display the same target-relative pointer location using the shared browser library. Scroll and resize update the overlay position.                            |
| Different view or reordered delivery           | A stale view or sequence never reappears as a pointer. Switching views clears old actors and cancels the active assistant step.                                    |
| Human and assistant present together           | Each pointer remains identifiable. Showing settings moves the assistant to the control while the human can still operate the view.                                 |
| Invoke an allowed action                       | The assistant reaches the control, then the registered handler opens its panel exactly once.                                                                       |
| Missing target or denied action                | The controller reports the reason and the application performs no action. A disappearing target or cancellation during movement also stops invocation.             |
| Reconnect and dispose                          | Disconnection clears pointers. Reconnection displays fresh updates. Unmounting releases listeners, observers and transport subscriptions and cancels pending work. |
| Angular, React, Vue and Svelte                 | Every adapter can register a mounted target, show it and release it on unmount. A framework-free import of the core remains usable throughout.                     |
| Keyboard and reduced motion                    | The overlay preserves keyboard focus and does not obstruct host controls. The reduced-motion mode reaches the same target and produces the same action result.     |
