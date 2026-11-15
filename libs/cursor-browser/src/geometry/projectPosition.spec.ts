// #region Imports

import { expect, it } from 'vitest';
import { projectPosition } from './projectPosition.js';

// #endregion

it('uses the receiving surface size and its scrolled viewport origin', () => {
    const receiver = { left: 30, top: -40, width: 200, height: 160 };

    expect(projectPosition(receiver, { x: 0.75, y: 0.5 })).toEqual({ x: 180, y: 40 });
});
