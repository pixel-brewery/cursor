// #region Imports

import { expect, test, vi } from 'vitest';

import type { ICursorControllerOptions } from '../interfaces/ICursorControllerOptions.js';
import type { ICursorParticipant } from '../interfaces/ICursorParticipant.js';
import type { ICursorTransport } from '../interfaces/ICursorTransport.js';
import type { IPointer } from '../interfaces/IPointer.js';
import type { CursorCommand } from '../models/CursorCommand.js';
import type { IPointerUpdate } from '../models/IPointerUpdate.js';
import { createCursorController } from './CursorController.js';

// #endregion

const local = { id: 'local', label: 'Local' } satisfies ICursorParticipant;
const remote = {
    id: 'remote',
    label: 'Remote',
    source: 'human',
    color: '#227777',
} satisfies ICursorParticipant;
const viewId = 'sample-settings';
const invoke = { kind: 'invoke', targetId: 'settings', actionId: 'open' } satisfies CursorCommand;

function fixture(
    options: Pick<ICursorControllerOptions, 'authorize'> = {},
    publish = vi.fn<ICursorTransport['publish']>(),
) {
    const unsubscribe = vi.fn();
    const subscribe = vi.fn<ICursorTransport['subscribe']>(() => unsubscribe);
    const controller = createCursorController({
        viewId,
        participant: local,
        generation: 3,
        transport: { publish, subscribe },
        ...options,
    });
    const receive = subscribe.mock.calls[0]?.[0];
    if (!receive) throw new Error('The controller must subscribe when created.');

    return { controller, publish, send: receive, unsubscribe };
}

function move(
    overrides: Partial<Extract<IPointerUpdate, { kind: 'move' }>> = {},
): IPointerUpdate {
    return {
        kind: 'move',
        viewId,
        participant: remote,
        generation: 3,
        sequence: 1,
        position: { x: 0.1, y: 0.9 },
        ...overrides,
    };
}

test('only displays valid ordered updates for remote participants in the current view', () => {
    const { controller, send } = fixture();
    const notify = vi.fn<(pointers: readonly IPointer[]) => void>();
    controller.subscribe(notify);
    send(move({ viewId: 'different' }));
    send(move({ participant: local }));
    send(move({ position: { x: Infinity, y: 0.5 } }));
    send(move({ participant: { ...remote, color: 'url(example)' } }));

    send(move({ sequence: 5, targetId: 'settings' }));
    send(move({ sequence: 5, position: { x: 0.2, y: 0.2 } }));
    send(move({ sequence: 4, position: { x: 0.9, y: 0.9 } }));
    send(move({ generation: 2, sequence: 90 }));
    expect(controller.getPointers()).toEqual([
        { participant: remote, position: { x: 0.1, y: 0.9 }, targetId: 'settings' },
    ]);
    expect(notify).toHaveBeenCalledTimes(1);

    send({ kind: 'leave', viewId, participant: remote, generation: 3, sequence: 6 });
    send(move({ sequence: 5 }));
    expect(controller.getPointers()).toEqual([]);
    expect(notify).toHaveBeenCalledTimes(2);
});

test('departure fences its generation while a newer attachment may restart its sequence', () => {
    const { controller, send } = fixture();
    send(move({ generation: 4, sequence: 40 }));
    send({ kind: 'departure', viewId, actorId: remote.id, generation: 3 });
    expect(controller.getPointers()).toHaveLength(1);

    send({ kind: 'departure', viewId, actorId: remote.id, generation: 4 });
    send(move({ generation: 4, sequence: 99 }));
    expect(controller.getPointers()).toEqual([]);

    send(move({ generation: 5 }));
    expect(controller.getPointers()).toHaveLength(1);
});

test('a departure with no generation permanently retires that participant identifier', () => {
    const { controller, send } = fixture();
    send(move());
    send({ kind: 'departure', viewId, actorId: remote.id });
    send(move({ generation: Number.MAX_SAFE_INTEGER }));
    send(move({ participant: { id: 'new-user', label: 'New user' } }));

    expect(controller.getPointers()).toEqual([
        { participant: { id: 'new-user', label: 'New user' }, position: { x: 0.1, y: 0.9 } },
    ]);
});

test('disconnection clears visible pointers and reconnect discards reordered prior updates', () => {
    const { controller, send, publish } = fixture();
    send(move({ sequence: 4 }));

    send({ kind: 'disconnected' });
    send(move({ sequence: 5 }));
    controller.move({ x: 0.2, y: 0.2 });
    expect(controller.getPointers()).toEqual([]);
    expect(publish).not.toHaveBeenCalled();

    send({ kind: 'connected' });
    send(move({ sequence: 4 }));
    expect(controller.getPointers()).toEqual([]);
    send(move({ sequence: 6 }));
    expect(controller.getPointers()).toHaveLength(1);
});

test('disconnection cancels guidance and reconnect permits a fresh command on the same target', async () => {
    const authorizationStarted = Promise.withResolvers<void>();
    const authorization = Promise.withResolvers<boolean>();
    const { controller, send } = fixture({
        authorize() {
            authorizationStarted.resolve();
            return authorization.promise;
        },
    });
    const handler = vi.fn();
    const transitions: [connected: boolean, pointers: readonly IPointer[]][] = [];
    controller.subscribe((pointers) => transitions.push([controller.isConnected, pointers]));
    controller.registerTarget('settings', () => true);
    controller.registerAction({ id: 'open', targetId: 'settings', handler });
    const command = controller.run(invoke);
    await authorizationStarted.promise;

    send({ kind: 'disconnected' });
    send({ kind: 'disconnected' });
    authorization.resolve(true);
    expect(controller.isConnected).toBe(false);
    await expect(command).resolves.toEqual({ status: 'cancelled' });
    await expect(controller.run(invoke)).resolves.toEqual({ status: 'cancelled' });
    expect(handler).not.toHaveBeenCalled();

    send({ kind: 'connected' });
    send({ kind: 'connected' });
    expect(controller.isConnected).toBe(true);
    await expect(controller.run(invoke)).resolves.toEqual({ status: 'invoked' });
    expect(handler).toHaveBeenCalledTimes(1);

    controller.dispose();
    expect(controller.isConnected).toBe(false);
    expect(transitions).toEqual([[false, []], [true, []], [false, []]]);
});

test('disposal withdraws the local pointer once and releases live input', () => {
    const { controller, publish, send, unsubscribe } = fixture();
    controller.move({ x: 0.3, y: 0.4 }, 'settings');
    controller.dispose();
    controller.dispose();
    send(move());
    controller.move({ x: 0.5, y: 0.6 });

    expect(publish).toHaveBeenCalledTimes(2);
    expect(publish).toHaveBeenNthCalledWith(1, {
        kind: 'move',
        viewId,
        participant: local,
        generation: 3,
        sequence: 1,
        position: { x: 0.3, y: 0.4 },
        targetId: 'settings',
    });
    expect(publish).toHaveBeenNthCalledWith(2, {
        kind: 'leave', viewId, participant: local, generation: 3, sequence: 2,
    });
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(controller.getPointers()).toEqual([]);
});

test('disposal releases the transport and state even when publishing the leave throws', async () => {
    const error = new Error('transport closed');
    const publish = vi.fn<ICursorTransport['publish']>().mockImplementation((update) => {
        if (update.kind === 'leave') throw error;
    });
    const { controller, send, unsubscribe } = fixture({ authorize: () => true }, publish);
    controller.move({ x: 0.3, y: 0.4 });
    send(move());
    controller.registerTarget('settings', () => true);

    expect(() => controller.dispose()).toThrow(error);
    controller.dispose();
    await expect(controller.run(invoke)).resolves.toEqual({ status: 'cancelled' });
    expect(controller.isConnected).toBe(false);
    expect(controller.getPointers()).toEqual([]);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
});
