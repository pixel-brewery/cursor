// #region Imports

import type { CursorCommand } from '../models/CursorCommand.js';
import type { CursorResult } from '../models/CursorResult.js';
import type { ICursorAction } from '../interfaces/ICursorAction.js';
import type { ICursorController } from '../interfaces/ICursorController.js';
import type { ICursorControllerOptions } from '../interfaces/ICursorControllerOptions.js';
import { isIdentifier } from '../utils/CursorWireUtils.js';

// #endregion

interface ITarget {
    readonly presenter: Parameters<ICursorController['registerTarget']>[1];
    readonly isAvailable: () => boolean;
}

interface IRun {
    readonly targetId: string;
    readonly actionId: string | undefined;
    readonly lifetime: AbortController;
    invoking: boolean;
}

async function waitFor<Output>(
    operation: () => Output | Promise<Output>,
    signal: AbortSignal,
): Promise<Output> {
    signal.throwIfAborted();
    let onAbort: () => void = () => {};
    try {
        const cancelled = new Promise<never>((_resolve, reject) => {
            onAbort = () => reject(signal.reason);
            signal.addEventListener('abort', onAbort, { once: true });
        });
        const result = Promise.resolve().then(() => {
            signal.throwIfAborted();
            return operation();
        });
        return await Promise.race([cancelled, result]);
    } finally {
        signal.removeEventListener('abort', onAbort);
    }
}

export function createGuidance(authorize: ICursorControllerOptions['authorize']) {
    const targets = new Map<string, ITarget>();
    const actions = new Map<string, ICursorAction>();
    let active: IRun | undefined;
    let disposed = false;

    function registerTarget(
        targetId: string,
        presenter: ITarget['presenter'],
        isAvailable: ITarget['isAvailable'] = () => true,
    ): () => void {
        if (disposed || !isIdentifier(targetId) || targets.has(targetId)) {
            throw new Error(
                'Target registration requires a live controller and a unique target ID.',
            );
        }
        const entry = { presenter, isAvailable };
        targets.set(targetId, entry);
        return () => {
            if (targets.get(targetId) !== entry) return;
            targets.delete(targetId);
            if (active?.targetId === targetId) active.lifetime.abort();
        };
    }

    function registerAction(action: ICursorAction): () => void {
        const { id, targetId, handler } = action;
        if (disposed || !isIdentifier(id) || !isIdentifier(targetId) || actions.has(id)) {
            throw new Error(
                'Action registration requires a live controller and a unique action ID.',
            );
        }
        const entry = { id, targetId, handler };
        actions.set(id, entry);
        return () => {
            if (actions.get(id) !== entry) return;
            actions.delete(id);
            if (active?.actionId === id) active.lifetime.abort();
        };
    }

    async function run(command: CursorCommand, callerSignal?: AbortSignal): Promise<CursorResult> {
        if (disposed || callerSignal?.aborted) return { status: 'cancelled' };
        if (
            !command ||
            (command.kind !== 'show' && command.kind !== 'invoke') ||
            !isIdentifier(command.targetId)
        ) {
            return { status: 'unavailable' };
        }
        const { targetId } = command;
        const target = targets.get(targetId);
        if (!target || active?.invoking) return { status: 'unavailable' };

        const invocation: Extract<CursorCommand, { kind: 'invoke' }> | undefined =
            command.kind === 'invoke'
                ? { kind: command.kind, targetId, actionId: command.actionId, input: command.input }
                : undefined;
        const action = invocation ? actions.get(invocation.actionId) : undefined;
        if (invocation && action?.targetId !== targetId) return { status: 'unavailable' };

        active?.lifetime.abort();
        const current = {
            targetId,
            actionId: action?.id,
            lifetime: new AbortController(),
            invoking: false,
        };
        active = current;
        const signal = callerSignal
            ? AbortSignal.any([current.lifetime.signal, callerSignal])
            : current.lifetime.signal;

        try {
            const shown =
                target.isAvailable() && (await waitFor(() => target.presenter({ signal }), signal));
            signal.throwIfAborted();
            if (!shown || !target.isAvailable()) return { status: 'unavailable' };
            if (!invocation || !action) return { status: 'shown' };

            if (
                !authorize ||
                (await waitFor(() => authorize(invocation, signal), signal)) !== true
            ) {
                signal.throwIfAborted();
                return { status: 'denied' };
            }
            if (!target.isAvailable()) return { status: 'unavailable' };
            signal.throwIfAborted();

            // Once the host starts a handler, report its result and let the host own any retry.
            current.invoking = true;
            await action.handler(invocation.input, signal);
            return { status: 'invoked' };
        } catch (error) {
            if (signal.aborted && (!current.invoking || error === signal.reason))
                return { status: 'cancelled' };
            return { status: 'failed', error };
        } finally {
            if (active === current) active = undefined;
        }
    }

    function cancel(): void {
        active?.lifetime.abort();
    }

    function dispose(): void {
        disposed = true;
        cancel();
        targets.clear();
        actions.clear();
    }

    return { registerTarget, registerAction, run, cancel, dispose };
}
