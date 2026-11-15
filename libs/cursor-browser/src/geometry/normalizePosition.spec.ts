// #region Imports

import { describe, expect, it } from 'vitest';
import { normalizePosition } from './normalizePosition.js';

// #endregion

describe('normalizePosition', () => {
    const bounds = { left: 20, top: 40, width: 400, height: 200 };

    it('normalizes viewport input relative to the nonzero surface origin', () => {
        expect(normalizePosition(bounds, 120, 190)).toEqual({ x: 0.25, y: 0.75 });
    });

    it('clamps pointer capture beyond opposite edges into the transport range', () => {
        expect(normalizePosition(bounds, 1, 400)).toEqual({ x: 0, y: 1 });
    });

    it.each([
        { ...bounds, width: 0 },
        { ...bounds, height: 0 },
    ])('suppresses positions for collapsed surfaces', (collapsed) => {
        expect(normalizePosition(collapsed, 120, 190)).toBeUndefined();
    });
});
