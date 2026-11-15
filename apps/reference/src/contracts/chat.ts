// #region Imports

import { z } from 'zod';
import { chatMessageSchema } from './ChatMessage.js';

// #endregion

/** The latest user turn and at most four completed conversation turns. */
export const chatRequestSchema = z.strictObject({
    messages: z
        .array(chatMessageSchema)
        .min(1)
        .max(9)
        .refine(
            (messages) =>
                messages.length % 2 === 1 &&
                messages.every(
                    (message, index) => message.role === (index % 2 ? 'assistant' : 'user'),
                ),
        ),
});

/** A model reply and the only suggestions the reference view knows how to execute. */
export const chatReplySchema = z.strictObject({
    text: z.string().trim().min(1).max(450),
    action: z.enum(['show-settings', 'open-settings', 'none']),
});

/** A validated model reply that cannot specify selectors, code or other commands. */
export type ChatReply = z.infer<typeof chatReplySchema>;
