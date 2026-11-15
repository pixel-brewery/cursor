# Function: createCursorController()

> **createCursorController**(`options`): [`ICursorController`](../interfaces/ICursorController.md)

Creates a controller and immediately subscribes to the host transport for one view.

## Parameters

### options

[`ICursorControllerOptions`](../interfaces/ICursorControllerOptions.md)

The active view, local participant and host capabilities.

## Returns

[`ICursorController`](../interfaces/ICursorController.md)

A controller that owns the view's disposable runtime state.

## Remarks

The host owns participant authentication, view membership and action
authorization. Dispose the returned controller when its view unmounts.

## Throws

An error for invalid view or participant identifiers, display
metadata or generation. Synchronous transport subscription failures propagate.

## Example

```ts
const controller = createCursorController({
    viewId: 'settings',
    participant: { id: 'local-user', label: 'Local user' },
    transport,
});
const unsubscribe = controller.subscribe(renderPointers);
controller.move({ x: 0.5, y: 0.5 });
// When the view unmounts:
unsubscribe();
controller.dispose();
```
