// #region Imports

import { EventEmitter } from 'node:events';
import type { IpcMainInvokeEvent, WebContents } from 'electron';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ChatReply } from '../../contracts/chat.js';
import type { ChatMessage } from '../../contracts/ChatMessage.js';
import type { DesktopConnectionState } from '../../contracts/DesktopConnection.js';
import { registerDesktopConnection } from './registerDesktopConnection.js';

// #endregion

type Handler = (event: IpcMainInvokeEvent, method: unknown, input: unknown) => Promise<unknown>;

const electron = vi.hoisted(() => ({
    handle: vi.fn<(channel: string, handler: Handler) => void>(),
    removeHandler: vi.fn<(channel: string) => void>(),
    openExternal: vi.fn<(url: string) => Promise<void>>(async () => undefined),
}));

vi.mock('electron', () => ({
    ipcMain: { handle: electron.handle, removeHandler: electron.removeHandler },
    shell: { openExternal: electron.openExternal },
}));

const url = new URL('http://127.0.0.1:4317/?host=electron');
const state: DesktopConnectionState = {
    connection: null,
    status: 'unchecked',
    methods: [],
    login: null,
};
const message: ChatMessage = { role: 'user', content: 'Zeig mir die Einstellungen' };
const answer: ChatReply = { text: 'Ich zeige sie dir.', action: 'show-settings' };
const firstId = '59508e72-d281-451b-8ec3-8fe0d0243404';
const secondId = '65fa1019-e3b8-4d04-8b10-14b07240d880';
const cleanup: (() => void)[] = [];

afterEach(() => {
    while (cleanup.length) cleanup.pop()?.();
    vi.clearAllMocks();
});

describe('registerDesktopConnection', () => {
    it('accepts the exact reference document and rejects other senders or frames', async () => {
        const fixture = openBridge();

        for (const untrusted of [
            { sender: {}, senderFrame: fixture.frame },
            { sender: fixture.contents, senderFrame: { ...fixture.frame } },
            { sender: fixture.contents, senderFrame: null },
        ]) {
            await expect(fixture.invoke('getState', undefined, untrusted)).rejects.toThrow(
                'Untrusted desktop assistant request.',
            );
        }
        fixture.frame.url = new URL('/other', url).href;
        await expect(fixture.invoke('getState')).rejects.toThrow(
            'Untrusted desktop assistant request.',
        );
        expect(fixture.assistant.getState).not.toHaveBeenCalled();

        fixture.frame.url = url.href;
        await expect(fixture.invoke('getState')).resolves.toEqual(state);
        expect(fixture.assistant.getState).toHaveBeenCalledTimes(1);
    });

    it('validates renderer payloads before invoking file, login or chat operations', async () => {
        const fixture = openBridge();

        await expect(
            fixture.invoke('save', { provider: 'codex', apiKey: 'fake' }),
        ).rejects.toThrow();
        await expect(fixture.invoke('startLogin', '   ')).rejects.toThrow();
        await expect(
            fixture.invoke('respondLogin', { operationId: 'orphan', values: {} }),
        ).rejects.toThrow();
        await expect(
            fixture.invoke('chat', { requestId: 'invalid', messages: [message] }),
        ).rejects.toThrow();
        await expect(
            fixture.invoke('shell.openExternal', 'https://auth.example.test'),
        ).rejects.toThrow();

        expect(fixture.assistant.save).not.toHaveBeenCalled();
        expect(fixture.assistant.startLogin).not.toHaveBeenCalled();
        expect(fixture.assistant.respondLogin).not.toHaveBeenCalled();
        expect(fixture.assistant.chat).not.toHaveBeenCalled();
        expect(electron.openExternal).not.toHaveBeenCalled();
    });

    it.each([
        'https://auth.example.test/login',
        'http://localhost:49321/oauth',
        'http://[::1]:49321/oauth',
    ])(
        'opens a supported URL only from the current native login interaction (%s)',
        async (address) => {
            const fixture = openBridge();
            fixture.assistant.getLoginUrl.mockReturnValue(address);

            await expect(fixture.invoke('openLogin')).resolves.toBeUndefined();
            expect(electron.openExternal).toHaveBeenCalledExactlyOnceWith(address);
        },
    );

    it.each([
        undefined,
        'file:///tmp/login',
        'http://auth.example.test/login',
        'https://192.0.2.1/login',
        'https://username:password@auth.example.test/login',
    ])('refuses an unsafe or absent login URL (%s)', async (address) => {
        const fixture = openBridge();
        fixture.assistant.getLoginUrl.mockReturnValue(address);

        await expect(fixture.invoke('openLogin')).rejects.toThrow();
        expect(electron.openExternal).not.toHaveBeenCalled();
    });

    it('rejects a renderer-supplied URL even when a native login is active', async () => {
        const fixture = openBridge();
        fixture.assistant.getLoginUrl.mockReturnValue('https://auth.example.test/login');

        await expect(
            fixture.invoke('openLogin', 'https://other.example.test/login'),
        ).rejects.toThrow();
        expect(fixture.assistant.getLoginUrl).not.toHaveBeenCalled();
        expect(electron.openExternal).not.toHaveBeenCalled();
    });

    it('allows one active chat and accepts cancellation only for its request id', async () => {
        const fixture = openBridge();
        const result = Promise.withResolvers<ChatReply>();
        fixture.assistant.chat.mockReturnValueOnce(result.promise);

        const active = fixture.invoke('chat', { requestId: firstId, messages: [message] });
        const signal = fixture.assistant.chat.mock.calls[0]?.[1];
        expect(signal?.aborted).toBe(false);
        await expect(
            fixture.invoke('chat', { requestId: secondId, messages: [message] }),
        ).rejects.toThrow();
        await fixture.invoke('cancelChat', secondId);
        expect(signal?.aborted).toBe(false);

        await fixture.invoke('cancelChat', firstId);
        expect(signal?.aborted).toBe(true);
        result.resolve(answer);
        await expect(active).rejects.toThrow();
        await expect(
            fixture.invoke('chat', { requestId: secondId, messages: [message] }),
        ).resolves.toEqual(answer);
        expect(fixture.assistant.chat).toHaveBeenCalledTimes(2);
    });

    it('aborts active chat and revokes the channel when its window is destroyed', async () => {
        const fixture = openBridge();
        const result = Promise.withResolvers<ChatReply>();
        fixture.assistant.chat.mockReturnValueOnce(result.promise);
        const active = fixture.invoke('chat', { requestId: firstId, messages: [message] });

        fixture.native.emit('destroyed');
        result.resolve(answer);

        await expect(active).rejects.toThrow();
        expect(fixture.assistant.chat.mock.calls[0]?.[1].aborted).toBe(true);
        expect(electron.removeHandler).toHaveBeenCalledExactlyOnceWith('cursor:desktop');
        await expect(fixture.invoke('getState')).rejects.toThrow(
            'Untrusted desktop assistant request.',
        );
    });

    it('aborts active chat only when navigation replaces the main document', async () => {
        const fixture = openBridge();
        const result = Promise.withResolvers<ChatReply>();
        fixture.assistant.chat.mockReturnValueOnce(result.promise);
        const active = fixture.invoke('chat', { requestId: firstId, messages: [message] });
        const signal = fixture.assistant.chat.mock.calls[0]?.[1];

        fixture.native.emit('did-start-navigation', { isMainFrame: false, isSameDocument: false });
        fixture.native.emit('did-start-navigation', { isMainFrame: true, isSameDocument: true });
        expect(signal?.aborted).toBe(false);

        fixture.native.emit('did-start-navigation', { isMainFrame: true, isSameDocument: false });

        expect(signal?.aborted).toBe(true);
        result.resolve(answer);
        await expect(active).rejects.toThrow();
    });

    it('returns a safe error when the provider failure contains private diagnostics', async () => {
        const fixture = openBridge();
        fixture.assistant.chat.mockRejectedValueOnce(new Error('Fake private native diagnostic.'));

        await expect(
            fixture.invoke('chat', { requestId: firstId, messages: [message] }),
        ).rejects.toMatchObject({
            message: 'The desktop assistant request could not be completed.',
        });
    });
});

function openBridge() {
    const frame = { url: url.href };
    const native = Object.assign(new EventEmitter(), {
        isDestroyed: () => false,
        mainFrame: frame,
    });
    const contents = native as unknown as WebContents;
    const event = { sender: contents, senderFrame: frame };
    const assistant = {
        getState: vi.fn(async () => state),
        save: vi.fn(async () => state),
        check: vi.fn(async () => state),
        startLogin: vi.fn(async () => state),
        respondLogin: vi.fn(async () => state),
        cancelLogin: vi.fn(async () => state),
        getLoginUrl: vi.fn<() => string | undefined>(),
        chat: vi.fn(async (_messages: readonly ChatMessage[], _signal: AbortSignal) => answer),
    } satisfies Parameters<typeof registerDesktopConnection>[2];
    cleanup.push(registerDesktopConnection(contents, url, assistant));
    const handler = electron.handle.mock.calls.at(-1)?.[1];
    if (!handler) throw new Error('Desktop IPC did not register a request handler.');

    const invoke = (method: unknown, input?: unknown, source: unknown = event): Promise<unknown> =>
        handler(source as IpcMainInvokeEvent, method, input);

    return { native, contents, frame, invoke, assistant };
}
