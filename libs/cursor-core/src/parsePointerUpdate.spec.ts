// #region Imports

import { expect, test } from 'vitest';

import type { IPointerUpdate } from './models/IPointerUpdate.js';
import { parsePointerUpdate } from './parsePointerUpdate.js';

// #endregion

const move = {
    kind: 'move',
    viewId: 'settings',
    participant: { id: 'participant', label: 'Assistant', source: 'assistant', color: '#aabbcc' },
    generation: 3,
    sequence: 1,
    position: { x: 0, y: 1 },
    targetId: 'notifications',
} satisfies IPointerUpdate;

test('copies a move and retains only the defined wire fields', () => {
    const participant = { ...move.participant, extra: 'discarded' };
    const position = { ...move.position, extra: 'discarded' };

    const parsed = parsePointerUpdate({ ...move, participant, position, other: 'discarded' });
    participant.label = 'Changed';
    position.x = 0.5;

    expect(parsed).toEqual(move);
});

test('parses a leave without interpreting optional move-only metadata', () => {
    const leave = {
        kind: 'leave',
        viewId: move.viewId,
        participant: { id: 'participant', label: 'Participant' },
        generation: 3,
        sequence: 2,
    } satisfies IPointerUpdate;

    expect(parsePointerUpdate({ ...leave, position: null, targetId: true })).toEqual(leave);
});

test.each([
    { invalid: 'null payload', value: null },
    { invalid: 'array payload', value: [move] },
    { invalid: 'primitive payload', value: 'move' },
    { invalid: 'unknown kind', value: { ...move, kind: 'invoke' } },
    { invalid: 'connection lifecycle', value: { kind: 'disconnected' } },
    {
        invalid: 'departure lifecycle',
        value: { kind: 'departure', viewId: move.viewId, actorId: move.participant.id },
    },
    { invalid: 'missing scope', value: { ...move, viewId: undefined } },
    { invalid: 'blank scope', value: { ...move, viewId: '   ' } },
    { invalid: 'zero generation', value: { ...move, generation: 0 } },
    { invalid: 'fractional sequence', value: { ...move, sequence: 0.5 } },
    { invalid: 'unsafe sequence', value: { ...move, sequence: Number.MAX_SAFE_INTEGER + 1 } },
    { invalid: 'non-object participant', value: { ...move, participant: 'participant' } },
    {
        invalid: 'missing participant label',
        value: { ...move, participant: { id: move.participant.id } },
    },
    {
        invalid: 'invalid participant source',
        value: { ...move, participant: { ...move.participant, source: 'model' } },
    },
    {
        invalid: 'invalid participant color',
        value: { ...move, participant: { ...move.participant, color: '#abc' } },
    },
    { invalid: 'missing position', value: { ...move, position: undefined } },
    { invalid: 'string coordinate', value: { ...move, position: { x: '0', y: 1 } } },
    { invalid: 'non-finite coordinate', value: { ...move, position: { x: 0, y: NaN } } },
    { invalid: 'out-of-bounds coordinate', value: { ...move, position: { x: -0.1, y: 1 } } },
    { invalid: 'overlong target identifier', value: { ...move, targetId: 'a'.repeat(129) } },
])('rejects $invalid', ({ value }) => {
    expect(parsePointerUpdate(value)).toBeUndefined();
});
