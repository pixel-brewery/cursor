import type { ICursorController } from './ICursorController.js';
import type { ICursorControllerOptions } from './ICursorControllerOptions.js';
import type { IPointer } from './IPointer.js';
import { createGuidance } from './guidance.js';
import { isGeneration, isIdentifier, readParticipant, readPosition, readTransportEvent } from './wire.js';

interface IActorStamp {
    readonly generation: number;
    readonly sequence: number;
}

let lastAutomaticGeneration = 0;

function allocateGeneration(): number {
    lastAutomaticGeneration = Math.max(Date.now(), lastAutomaticGeneration + 1);
    return lastAutomaticGeneration;
}

/**
 * Create a controller for one active view. The host owns transport authentication and action policy.
 *
 * @public
 * @param options - The active view, local participant and host capabilities.
 * @returns A controller that owns the view's disposable runtime state.
 */
export function createCursorController(options: ICursorControllerOptions): ICursorController {
    const { transport, viewId } = options;
    const localParticipant = readParticipant(options.participant);
    const generation = options.generation ?? allocateGeneration();
    if (!localParticipant || !isIdentifier(viewId) || !isGeneration(generation)) {
        throw new Error('A valid participant, view ID and generation are required.');
    }

    const participant = localParticipant;
    const guidance = createGuidance(options.authorize);
    const listeners = new Set<(pointers: readonly IPointer[]) => void>();
    const stamps = new Map<string, IActorStamp>();
    const pointers = new Map<string, IPointer>();
    let snapshot: readonly IPointer[] = Object.freeze([]);
    let localSequence = 0;
    let localVisible = false;
    let disposed = false;
    let connected = true;

    function notify(): void {
        snapshot = Object.freeze([...pointers.values()]);
        for (const listener of listeners) listener(snapshot);
    }

    function receive(message: unknown): void {
        if (disposed) return;
        const event = readTransportEvent(message);
        if (!event) return;

        if (event.kind === 'connected') {
            if (connected) return;
            connected = true;
            notify();
            return;
        }
        if (event.kind === 'disconnected') {
            if (!connected) return;
            connected = false;
            localVisible = false;
            pointers.clear();
            guidance.cancel();
            notify();
            return;
        }
        if (!connected || event.viewId !== viewId) return;
        if (event.kind === 'departure') {
            if (event.actorId === participant.id) return;
            const previous = stamps.get(event.actorId);
            const departureGeneration = event.generation ?? Infinity;
            if (previous && departureGeneration < previous.generation) return;
            stamps.set(event.actorId, { generation: departureGeneration, sequence: Infinity });
            if (pointers.delete(event.actorId)) notify();
            return;
        }

        const { id } = event.participant;
        if (id === participant.id) return;
        const previous = stamps.get(id);
        if (previous && (event.generation < previous.generation ||
            (event.generation === previous.generation && event.sequence <= previous.sequence))) return;

        stamps.set(id, { generation: event.generation, sequence: event.sequence });
        if (event.kind === 'leave') {
            if (pointers.delete(id)) notify();
            return;
        }
        pointers.set(id, Object.freeze({
            participant: event.participant,
            position: event.position,
            ...(event.targetId === undefined ? {} : { targetId: event.targetId }),
        }));
        notify();
    }

    const unsubscribe = transport.subscribe(receive);

    function nextUpdateScope() {
        return { viewId, participant, generation, sequence: ++localSequence };
    }

    function leave(): void {
        if (disposed || !connected || !localVisible) return;
        localVisible = false;
        transport.publish({ kind: 'leave', ...nextUpdateScope() });
    }

    return {
        participant,
        get isConnected() { return connected && !disposed; },
        getPointers: () => snapshot,
        subscribe(listener) {
            if (disposed) return () => {};
            listeners.add(listener);
            return () => { listeners.delete(listener); };
        },
        move(position, targetId) {
            if (disposed || !connected) return;
            const normalized = readPosition(position);
            if (!normalized || (targetId !== undefined && !isIdentifier(targetId))) return;
            localVisible = true;
            transport.publish({
                kind: 'move',
                ...nextUpdateScope(),
                position: normalized,
                ...(targetId === undefined ? {} : { targetId }),
            });
        },
        leave,
        registerTarget: guidance.registerTarget,
        registerAction: guidance.registerAction,
        run(command, signal) {
            if (!connected || disposed) return Promise.resolve({ status: 'cancelled' });
            return guidance.run(command, signal);
        },
        dispose() {
            if (disposed) return;
            try {
                leave();
            } finally {
                const wasConnected = connected;
                disposed = true;
                connected = false;
                guidance.dispose();
                stamps.clear();
                pointers.clear();
                try {
                    if (wasConnected) notify();
                } finally {
                    listeners.clear();
                    unsubscribe();
                }
            }
        },
    };
}
