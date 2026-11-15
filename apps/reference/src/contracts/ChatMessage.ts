// #region Imports

import { z } from 'zod';

// #endregion

/** Runtime validation for one conversation message accepted by the demo. */
export const chatMessageSchema = z.strictObject({
    role: z.enum(['user', 'assistant']),
    content: z.string().trim().min(1).max(700),
});

/** A user or assistant turn in the reference conversation. */
export type ChatMessage = z.infer<typeof chatMessageSchema>;
