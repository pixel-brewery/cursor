// #region Imports

import type { ChatMessage } from '../../contracts/ChatMessage.js';
import type { DesktopConnectionBridge } from '../../contracts/DesktopConnection.js';
import { chatReplySchema, type ChatReply } from '../../contracts/chat.js';

// #endregion

/**
 * Requests a reply through the desktop bridge or the browser's same-origin model relay.
 *
 * @param desktop - Available only in the Electron renderer.
 * @param messages - Bounded conversation ending in a user message.
 * @param signal - Cancels the request when its chat or view ends.
 * @returns A validated reply and cursor suggestion.
 * @throws If the selected connection fails or returns invalid data.
 * @internal
 */
export async function requestChatReply(
    desktop: DesktopConnectionBridge | undefined,
    messages: readonly ChatMessage[],
    signal: AbortSignal,
): Promise<ChatReply> {
    signal.throwIfAborted();
    if (desktop) {
        const requestId = crypto.randomUUID();
        const abort = () => void desktop.cancelChat(requestId).catch(() => {});
        signal.addEventListener('abort', abort, { once: true });
        try {
            return chatReplySchema.parse(await desktop.chat({ requestId, messages }));
        } finally {
            signal.removeEventListener('abort', abort);
        }
    }

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
        signal,
    });
    if (!response.ok) {
        throw new Error('The model relay rejected the chat request.', { cause: response.status });
    }
    return chatReplySchema.parse(await response.json());
}
