// #region Imports

import { z } from 'zod';

// #endregion

/** The selectable pointer styles, in the same order as the reference view. */
export const cursorStyleSchema = z.enum(['outline', 'pill', 'square', 'square-outline']);

/** A selectable style applied to the current view. */
export type CursorStyle = z.infer<typeof cursorStyleSchema>;

/** The input accepted by the registered style action. */
export const cursorStyleChangeSchema = z.enum([...cursorStyleSchema.options, 'next']);
