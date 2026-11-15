// #region Imports

import { cursorPalette } from './cursorPalette.js';

// #endregion

/** Label fills, outlines and text colors sampled from the Cursor design reference. */
export const pointerColors = new Map<
    string,
    {
        readonly light: string;
        readonly border: string;
        readonly text: string;
    }
>([
    [cursorPalette.blue, { light: '#2e90fa', border: cursorPalette.blue, text: '#fff' }],
    [cursorPalette.green, { light: '#12b76a', border: cursorPalette.green, text: '#fff' }],
    [cursorPalette.orange, { light: '#f79007', border: cursorPalette.orange, text: '#fff' }],
    [cursorPalette.pink, { light: '#ee47bc', border: cursorPalette.pink, text: '#fff' }],
    [cursorPalette.cyan, { light: cursorPalette.cyan, border: '#36bff9', text: '#192b33' }],
]);
