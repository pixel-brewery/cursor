import assert from 'node:assert/strict';
import test from 'node:test';

import { createCursorController, parsePointerUpdate } from '../dist/index.js';

const local = { id: 'local', label: 'Local' };
const remote = { id: 'remote', label: 'Remote', source: 'human', color: '#227777' };
const surface = 'sample-settings';
const invoke = { kind: 'invoke', targetId: 'settings', actionId: 'open' };

function fixture(options = {}) {
    const published = [];
    let receive;
    let unsubscribed = 0;
    const controller = createCursorController({
        viewId: surface,
        participant: local,
        generation: 3,
        transport: {
            publish(event) {
                published.push(event);
            },
            subscribe(listener) {
                receive = listener;
                return () => { unsubscribed++; };
            },
        },
        ...options,
    });

    return {
        controller,
        published,
        send: (message) => receive(message),
        unsubscribed: () => unsubscribed,
    };
}

function move(overrides = {}) {
    return {
        kind: 'move',
        viewId: surface,
        participant: remote,
        generation: 3,
        sequence: 1,
        position: { x: 0.1, y: 0.9 },
        ...overrides,
    };
}

function deferred() {
    let resolve;
    const result = new Promise((settle) => { resolve = settle; });
    return { result, resolve };
}

test('only displays valid ordered updates for remote participants in the current view', () => {
    const { controller, send } = fixture();
    const snapshots = [];
    controller.subscribe((pointers) => snapshots.push(pointers));
    send(move({ viewId: 'different' }));
    send(move({ participant: local }));
    send(move({ position: { x: Infinity, y: 0.5 } }));
    send(move({ position: { x: 0.5, y: -0.1 } }));
    send(move({ participant: { ...remote, color: 'url(example)' } }));

    send(move({ sequence: 5, targetId: 'settings' }));
    send(move({ sequence: 4, position: { x: 0.9, y: 0.9 } }));
    send(move({ generation: 2, sequence: 90 }));
    assert.deepEqual(controller.getPointers(), [{
        participant: remote,
        position: { x: 0.1, y: 0.9 },
        targetId: 'settings',
    }]);
    assert.equal(snapshots.length, 1);

    send(move({ kind: 'leave', sequence: 6 }));
    send(move({ sequence: 5 }));
    assert.deepEqual(controller.getPointers(), []);
    assert.equal(snapshots.length, 2);
});

test('a departure removes the matching generation and fences its late updates', () => {
    const { controller, send } = fixture();
    send(move({ generation: 4 }));
    send({ kind: 'departure', viewId: surface, actorId: remote.id, generation: 3 });
    assert.equal(controller.getPointers().length, 1);

    send({ kind: 'departure', viewId: surface, actorId: remote.id, generation: 4 });
    send(move({ generation: 4, sequence: 99 }));
    assert.deepEqual(controller.getPointers(), []);

    send(move({ generation: 5 }));
    assert.equal(controller.getPointers().length, 1);
});

test('disconnection clears visible pointers and reconnect discards reordered prior updates', () => {
    const { controller, send, published } = fixture();
    send(move({ sequence: 4 }));

    send({ kind: 'disconnected' });
    send(move({ sequence: 5 }));
    controller.move({ x: 0.2, y: 0.2 });
    assert.deepEqual(controller.getPointers(), []);
    assert.deepEqual(published, []);

    send({ kind: 'connected' });
    send(move({ sequence: 4 }));
    assert.deepEqual(controller.getPointers(), []);
    send(move({ sequence: 6 }));
    assert.equal(controller.getPointers().length, 1);
});

test('disconnection cancels guidance and reconnect permits a fresh command on the same target', async () => {
    const authorizationStarted = deferred();
    const authorization = deferred();
    const { controller, send } = fixture({
        authorize() {
            authorizationStarted.resolve();
            return authorization.result;
        },
    });
    let calls = 0;
    const transitions = [];
    controller.subscribe((pointers) => transitions.push([controller.isConnected, pointers]));
    controller.registerTarget('settings', () => true);
    controller.registerAction({ id: 'open', targetId: 'settings', handler() { calls++; } });
    const command = controller.run(invoke);
    await authorizationStarted.result;

    send({ kind: 'disconnected' });
    send({ kind: 'disconnected' });
    authorization.resolve(true);
    assert.equal(controller.isConnected, false);
    assert.deepEqual(await command, { status: 'cancelled' });
    assert.deepEqual(await controller.run(invoke), { status: 'cancelled' });
    assert.equal(calls, 0);

    send({ kind: 'connected' });
    send({ kind: 'connected' });
    assert.equal(controller.isConnected, true);
    assert.deepEqual(await controller.run(invoke), { status: 'invoked' });
    assert.equal(calls, 1);

    controller.dispose();
    assert.equal(controller.isConnected, false);
    assert.deepEqual(transitions, [[false, []], [true, []], [false, []]]);
});

test('disposal withdraws the local pointer once and releases live input', () => {
    const { controller, published, send, unsubscribed } = fixture();
    controller.move({ x: 0.3, y: 0.4 }, 'settings');
    controller.dispose();
    controller.dispose();
    send(move());
    controller.move({ x: 0.5, y: 0.6 });

    assert.deepEqual(published, [
        { kind: 'move', viewId: surface, participant: local, generation: 3, sequence: 1,
            position: { x: 0.3, y: 0.4 }, targetId: 'settings' },
        { kind: 'leave', viewId: surface, participant: local, generation: 3, sequence: 2 },
    ]);
    assert.equal(unsubscribed(), 1);
    assert.deepEqual(controller.getPointers(), []);
});

test('the boundary parser copies a valid move and rejects invalid wire coordinates', () => {
    const position = { x: 0.4, y: 0.5 };
    const parsed = parsePointerUpdate(move({ position }));
    position.x = 0.9;
    assert.deepEqual(parsed?.position, { x: 0.4, y: 0.5 });
    assert.equal(parsePointerUpdate(move({ position: { x: '0.4', y: 0.5 } })), undefined);
    assert.equal(parsePointerUpdate({ kind: 'disconnected' }), undefined);
});

test('shows without an action and invokes the bound handler only after presentation and authorization', async () => {
    const order = [];
    const { controller } = fixture({
        authorize(command) {
            order.push(['authorize', command.actionId]);
            return true;
        },
    });
    controller.registerTarget('settings', () => {
        order.push(['present']);
        return true;
    });
    controller.registerAction({
        id: 'open',
        targetId: 'settings',
        handler(input) { order.push(['handler', input]); },
    });

    assert.deepEqual(await controller.run({ kind: 'show', targetId: 'settings' }), { status: 'shown' });
    assert.deepEqual(order, [['present']]);

    order.length = 0;
    assert.deepEqual(await controller.run({ ...invoke, input: 'example' }), { status: 'invoked' });
    assert.deepEqual(order, [['present'], ['authorize', 'open'], ['handler', 'example']]);
});

test('denies action execution without explicit authorization', async () => {
    const { controller } = fixture();
    let invoked = false;
    controller.registerTarget('settings', () => true);
    controller.registerAction({ id: 'open', targetId: 'settings', handler() { invoked = true; } });

    assert.deepEqual(await controller.run(invoke), { status: 'denied' });
    assert.equal(invoked, false);
});

test('cancels during presentation even when the presenter has no cancellation handler', async () => {
    const started = deferred();
    const presentation = deferred();
    const { controller } = fixture({ authorize: () => true });
    let invoked = false;
    controller.registerTarget('settings', () => {
        started.resolve();
        return presentation.result;
    });
    controller.registerAction({ id: 'open', targetId: 'settings', handler() { invoked = true; } });
    const abort = new AbortController();
    const command = controller.run(invoke, abort.signal);
    await started.result;

    abort.abort();
    assert.deepEqual(await command, { status: 'cancelled' });
    presentation.resolve(true);
    assert.equal(invoked, false);
});

test('does not invoke a target that disappears while the host is authorizing', async () => {
    const authorizing = deferred();
    const allowed = deferred();
    const { controller } = fixture({
        authorize() {
            authorizing.resolve();
            return allowed.result;
        },
    });
    let available = true;
    let invoked = false;
    controller.registerTarget('settings', () => true, () => available);
    controller.registerAction({ id: 'open', targetId: 'settings', handler() { invoked = true; } });
    const command = controller.run(invoke);
    await authorizing.result;

    available = false;
    allowed.resolve(true);
    assert.deepEqual(await command, { status: 'unavailable' });
    assert.equal(invoked, false);
});

test('holds the invocation boundary while an accepted handler is in flight', async () => {
    const entered = deferred();
    const done = deferred();
    let calls = 0;
    const { controller } = fixture({ authorize: () => true });
    controller.registerTarget('settings', () => true);
    controller.registerAction({
        id: 'open',
        targetId: 'settings',
        handler() {
            calls++;
            entered.resolve();
            return done.result;
        },
    });
    const command = controller.run(invoke);
    await entered.result;

    assert.deepEqual(await controller.run(invoke), { status: 'unavailable' });
    done.resolve();
    assert.deepEqual(await command, { status: 'invoked' });
    assert.equal(calls, 1);
});
