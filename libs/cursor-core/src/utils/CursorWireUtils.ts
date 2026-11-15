// #region Imports

import type { CursorTransportEvent } from '../models/CursorTransportEvent.js';
import type { ICursorParticipant } from '../interfaces/ICursorParticipant.js';
import type { ICursorPosition } from '../interfaces/ICursorPosition.js';

// #endregion

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isIdentifier(value: unknown): value is string {
    return typeof value === 'string' && value.length <= 128 && value.trim().length > 0;
}

export function isGeneration(value: unknown): value is number {
    return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}

function isUnitCoordinate(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

export function readPosition(value: unknown): ICursorPosition | undefined {
    if (!isRecord(value) || !isUnitCoordinate(value.x) || !isUnitCoordinate(value.y))
        return undefined;
    return Object.freeze({ x: value.x, y: value.y });
}

export function readParticipant(value: unknown): ICursorParticipant | undefined {
    if (!isRecord(value) || !isIdentifier(value.id) || !isIdentifier(value.label)) return undefined;
    const { id, label, source, color } = value;
    if (source !== undefined && source !== 'human' && source !== 'assistant') return undefined;
    if (color !== undefined && (typeof color !== 'string' || !/^#[\da-f]{6}$/i.test(color)))
        return undefined;
    return Object.freeze({
        id,
        label,
        ...(source === undefined ? {} : { source }),
        ...(color === undefined ? {} : { color }),
    });
}

export function readTransportEvent(value: unknown): CursorTransportEvent | undefined {
    if (!isRecord(value)) return undefined;

    const { kind, viewId, generation } = value;
    if (kind === 'connected' || kind === 'disconnected') return { kind };
    if (!isIdentifier(viewId)) return undefined;

    if (kind === 'departure') {
        const { actorId } = value;
        if (!isIdentifier(actorId) || (generation !== undefined && !isGeneration(generation)))
            return undefined;
        return { kind, viewId, actorId, ...(generation === undefined ? {} : { generation }) };
    }

    if (
        (kind !== 'move' && kind !== 'leave') ||
        !isGeneration(generation) ||
        !isGeneration(value.sequence)
    ) {
        return undefined;
    }
    const participant = readParticipant(value.participant);
    if (!participant) return undefined;

    const scope = { viewId, participant, generation, sequence: value.sequence };
    if (kind === 'leave') return { kind, ...scope };

    const position = readPosition(value.position);
    const { targetId } = value;
    if (!position || (targetId !== undefined && !isIdentifier(targetId))) return undefined;
    return { kind, ...scope, position, ...(targetId === undefined ? {} : { targetId }) };
}
