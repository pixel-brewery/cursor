// #region Imports

import { expect, test, vi } from 'vitest';

import type { ICursorAction } from '../interfaces/ICursorAction.js';
import type { CursorCommand } from '../models/CursorCommand.js';
import { createGuidance } from './CursorGuidance.js';

// #endregion

const show = { kind: 'show', targetId: 'settings' } satisfies CursorCommand;
const invoke = {
    kind: 'invoke',
    targetId: 'settings',
    actionId: 'open',
} satisfies CursorCommand;

function registerOpen(guidance: ReturnType<typeof createGuidance>, handler: ICursorAction['handler']) {
    return guidance.registerAction({ id: 'open', targetId: 'settings', handler });
}

test('show presents without authorization and invoke authorizes only after presentation', async () => {
    const order: string[] = [];
    const authorize = vi.fn(() => {
        order.push('authorize');
        return true;
    });
    const guidance = createGuidance(authorize);
    guidance.registerTarget('settings', () => {
        order.push('present');
        return true;
    });
    const handler = vi.fn<ICursorAction['handler']>(() => order.push('handler'));
    registerOpen(guidance, handler);

    await expect(guidance.run(show)).resolves.toEqual({ status: 'shown' });
    expect(order).toEqual(['present']);
    expect(authorize).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();

    order.length = 0;
    const command = { ...invoke, input: 'example' };
    await expect(guidance.run(command)).resolves.toEqual({ status: 'invoked' });
    expect(order).toEqual(['present', 'authorize', 'handler']);
    expect(authorize).toHaveBeenCalledWith(command, expect.any(AbortSignal));
    expect(handler).toHaveBeenCalledWith('example', expect.any(AbortSignal));
});

test.each([
    { policy: 'missing', authorize: undefined },
    { policy: 'denying', authorize: () => false },
])('a $policy policy blocks the action handler', async ({ authorize }) => {
    const guidance = createGuidance(authorize);
    const handler = vi.fn();
    guidance.registerTarget('settings', () => true);
    registerOpen(guidance, handler);

    await expect(guidance.run(invoke)).resolves.toEqual({ status: 'denied' });
    expect(handler).not.toHaveBeenCalled();
});

test('an action registered for another target cannot enter presentation or authorization', async () => {
    const authorize = vi.fn(() => true);
    const guidance = createGuidance(authorize);
    const present = vi.fn(() => true);
    const handler = vi.fn();
    guidance.registerTarget('settings', present);
    guidance.registerAction({ id: 'open', targetId: 'other-target', handler });

    await expect(guidance.run(invoke)).resolves.toEqual({ status: 'unavailable' });
    expect(present).not.toHaveBeenCalled();
    expect(authorize).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();
});

test('a target that cannot be presented is unavailable before authorization', async () => {
    const authorize = vi.fn(() => true);
    const handler = vi.fn();
    const guidance = createGuidance(authorize);
    guidance.registerTarget('settings', () => false);
    registerOpen(guidance, handler);

    await expect(guidance.run(invoke)).resolves.toEqual({ status: 'unavailable' });
    expect(authorize).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();
});

test('rejects invoking a target that becomes unavailable during authorization', async () => {
    const authorizing = Promise.withResolvers<void>();
    const allowed = Promise.withResolvers<boolean>();
    const guidance = createGuidance(() => {
        authorizing.resolve();
        return allowed.promise;
    });
    let available = true;
    const handler = vi.fn();
    guidance.registerTarget('settings', () => true, () => available);
    registerOpen(guidance, handler);
    const command = guidance.run(invoke);
    await authorizing.promise;

    available = false;
    allowed.resolve(true);

    await expect(command).resolves.toEqual({ status: 'unavailable' });
    expect(handler).not.toHaveBeenCalled();
});

test('unregistering a target cancels its pending presentation and stale cleanup leaves its replacement active', async () => {
    const started = Promise.withResolvers<void>();
    const previous = Promise.withResolvers<boolean>();
    const guidance = createGuidance(() => true);
    const handler = vi.fn();
    const cleanup = guidance.registerTarget('settings', () => {
        started.resolve();
        return previous.promise;
    });
    registerOpen(guidance, handler);
    const pending = guidance.run(invoke);
    await started.promise;

    cleanup();
    const presentReplacement = vi.fn(() => true);
    guidance.registerTarget('settings', presentReplacement);
    cleanup();
    previous.resolve(true);

    await expect(pending).resolves.toEqual({ status: 'cancelled' });
    expect(handler).not.toHaveBeenCalled();
    await expect(guidance.run(invoke)).resolves.toEqual({ status: 'invoked' });
    expect(presentReplacement).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(1);
});

test('unregistering an action during authorization cancels that invocation without affecting its replacement', async () => {
    const authorizing = Promise.withResolvers<void>();
    const allowed = Promise.withResolvers<boolean>();
    const guidance = createGuidance(() => {
        authorizing.resolve();
        return allowed.promise;
    });
    const oldHandler = vi.fn();
    const newHandler = vi.fn();
    guidance.registerTarget('settings', () => true);
    const cleanup = registerOpen(guidance, oldHandler);
    const pending = guidance.run(invoke);
    await authorizing.promise;

    cleanup();
    registerOpen(guidance, newHandler);
    cleanup();
    allowed.resolve(true);

    await expect(pending).resolves.toEqual({ status: 'cancelled' });
    await expect(guidance.run(invoke)).resolves.toEqual({ status: 'invoked' });
    expect(oldHandler).not.toHaveBeenCalled();
    expect(newHandler).toHaveBeenCalledTimes(1);
});

test.each(['presentation', 'authorization', 'handler'] as const)(
    'reports a %s failure and releases the guidance slot',
    async (stage) => {
        const failure = new Error(`${stage} failed`);
        const presenter = vi.fn(() => true);
        const authorize = vi.fn(() => true);
        const handler = vi.fn<ICursorAction['handler']>();
        const guidance = createGuidance(authorize);
        guidance.registerTarget('settings', presenter);
        registerOpen(guidance, handler);
        const failing = { presentation: presenter, authorization: authorize, handler }[stage];
        failing.mockImplementationOnce(() => {
            throw failure;
        });

        await expect(guidance.run(invoke)).resolves.toEqual({ status: 'failed', error: failure });
        expect(authorize).toHaveBeenCalledTimes(stage === 'presentation' ? 0 : 1);
        expect(handler).toHaveBeenCalledTimes(stage === 'handler' ? 1 : 0);
        await expect(guidance.run(invoke)).resolves.toEqual({ status: 'invoked' });
    },
);

test('a pre-aborted request never presents a target', async () => {
    const guidance = createGuidance(() => true);
    const present = vi.fn(() => true);
    guidance.registerTarget('settings', present);

    await expect(guidance.run(show, AbortSignal.abort())).resolves.toEqual({ status: 'cancelled' });
    expect(present).not.toHaveBeenCalled();
});

test('cancels during presentation even when the presenter has no cancellation handler', async () => {
    const started = Promise.withResolvers<void>();
    const presentation = Promise.withResolvers<boolean>();
    const guidance = createGuidance(() => true);
    const handler = vi.fn();
    guidance.registerTarget('settings', () => {
        started.resolve();
        return presentation.promise;
    });
    registerOpen(guidance, handler);
    const abort = new AbortController();
    const command = guidance.run(invoke, abort.signal);
    await started.promise;

    abort.abort();

    await expect(command).resolves.toEqual({ status: 'cancelled' });
    presentation.resolve(true);
    expect(handler).not.toHaveBeenCalled();
});

test('keeps the invocation slot while an accepted handler runs and reports its completed side effect', async () => {
    const entered = Promise.withResolvers<AbortSignal>();
    const done = Promise.withResolvers<void>();
    const guidance = createGuidance(() => true);
    const handler = vi.fn<ICursorAction['handler']>((_input, signal) => {
        entered.resolve(signal);
        return done.promise;
    });
    guidance.registerTarget('settings', () => true);
    registerOpen(guidance, handler);
    const abort = new AbortController();
    const command = guidance.run(invoke, abort.signal);
    const handlerSignal = await entered.promise;

    abort.abort();
    expect(handlerSignal.aborted).toBe(true);
    await expect(guidance.run(invoke)).resolves.toEqual({ status: 'unavailable' });
    done.resolve();

    await expect(command).resolves.toEqual({ status: 'invoked' });
    expect(handler).toHaveBeenCalledTimes(1);
});

test.each(['abort reason', 'unrelated failure'] as const)(
    'an invoked handler that rejects with %s after cancellation preserves its outcome',
    async (rejection) => {
        const entered = Promise.withResolvers<void>();
        const done = Promise.withResolvers<void>();
        const guidance = createGuidance(() => true);
        guidance.registerTarget('settings', () => true);
        registerOpen(guidance, () => {
            entered.resolve();
            return done.promise;
        });
        const abort = new AbortController();
        const cancellation = new Error('request cancelled');
        const failure = new Error('host could not confirm the write');
        const pending = guidance.run(invoke, abort.signal);
        await entered.promise;

        abort.abort(cancellation);
        done.reject(rejection === 'abort reason' ? cancellation : failure);

        await expect(pending).resolves.toEqual(
            rejection === 'abort reason' ? { status: 'cancelled' } : { status: 'failed', error: failure },
        );
    },
);
