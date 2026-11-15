// #region Imports

import {
    ipcMain,
    shell,
    type IpcMainInvokeEvent,
    type WebContents,
    type WebContentsDidStartNavigationEventParams,
} from 'electron';
import { z } from 'zod';
import { chatReplySchema } from '../../contracts/chat.js';
import {
    desktopChatRequestSchema,
    desktopLoginResponseSchema,
    localConnectionSchema,
} from '../../contracts/DesktopConnection.js';
import { readNativeLoginUrl } from '../configuration/readNativeLoginUrl.js';
import type { LocalAssistant } from '../services/LocalAssistant.js';

// #endregion

const channel = 'cursor:desktop';
const loginMethodSchema = z.string().trim().min(1).max(120);

type DesktopAssistant = Pick<
    LocalAssistant,
    | 'getState'
    | 'save'
    | 'check'
    | 'startLogin'
    | 'respondLogin'
    | 'cancelLogin'
    | 'getLoginUrl'
    | 'chat'
>;

/**
 * Binds the reference window's trusted main frame to the native assistant operations.
 *
 * @param contents - The reference window's renderer. Other renderers cannot use the bridge.
 * @param documentUrl - Exact document URL expected in the renderer's main frame.
 * @param assistant - The local assistant owned by the Electron app.
 * @returns A cleanup function that revokes the bridge and aborts active chat.
 * @internal
 */
export function registerDesktopConnection(
    contents: WebContents,
    documentUrl: URL,
    assistant: DesktopAssistant,
): () => void {
    const expectedUrl = documentUrl.href;
    let activeChat: { readonly id: string; readonly controller: AbortController } | undefined;
    let closed = false;

    const abortChat = () => activeChat?.controller.abort();
    const onNavigation = (navigation: WebContentsDidStartNavigationEventParams) => {
        if (navigation.isMainFrame && !navigation.isSameDocument) abortChat();
    };
    const close = () => {
        if (closed) return;
        closed = true;
        ipcMain.removeHandler(channel);
        contents.off('destroyed', close);
        contents.off('render-process-gone', abortChat);
        contents.off('did-start-navigation', onNavigation);
        abortChat();
    };

    ipcMain.handle(channel, async (event, method: unknown, input: unknown) => {
        if (closed || !isTrustedRequest(event, contents, expectedUrl)) {
            throw new Error('Untrusted desktop assistant request.');
        }

        try {
            switch (method) {
                case 'getState':
                    return await assistant.getState();
                case 'save':
                    return await assistant.save(localConnectionSchema.parse(input));
                case 'check':
                    return await assistant.check();
                case 'startLogin':
                    return await assistant.startLogin(loginMethodSchema.parse(input));
                case 'respondLogin':
                    return await assistant.respondLogin(desktopLoginResponseSchema.parse(input));
                case 'cancelLogin':
                    return await assistant.cancelLogin();
                case 'openLogin': {
                    if (input !== undefined) throw new Error('Unexpected login URL input.');
                    const url = readNativeLoginUrl(assistant.getLoginUrl());
                    if (!url) throw new Error('No safe login URL.');
                    await shell.openExternal(url.href);
                    return;
                }
                case 'chat': {
                    const { requestId, messages } = desktopChatRequestSchema.parse(input);
                    if (activeChat) throw new Error('Another desktop chat request is active.');
                    const chat = { id: requestId, controller: new AbortController() };
                    activeChat = chat;
                    try {
                        const reply = await assistant.chat(messages, chat.controller.signal);
                        chat.controller.signal.throwIfAborted();
                        return chatReplySchema.parse(reply);
                    } finally {
                        activeChat = undefined;
                    }
                }
                case 'cancelChat':
                    if (activeChat?.id === desktopChatRequestSchema.shape.requestId.parse(input)) {
                        abortChat();
                    }
                    return;
                default:
                    throw new Error('Unknown desktop assistant operation.');
            }
        } catch {
            throw new Error('The desktop assistant request could not be completed.');
        }
    });

    contents.once('destroyed', close);
    contents.on('render-process-gone', abortChat);
    contents.on('did-start-navigation', onNavigation);
    return close;
}

function isTrustedRequest(event: IpcMainInvokeEvent, contents: WebContents, url: string): boolean {
    const frame = event.senderFrame;
    return (
        !contents.isDestroyed() &&
        event.sender === contents &&
        frame !== null &&
        frame === contents.mainFrame &&
        frame.url === url
    );
}
