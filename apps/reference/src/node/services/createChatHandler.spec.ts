// #region Imports

import { once } from 'node:events';
import {
    createServer,
    request as sendHttpRequest,
    type IncomingMessage,
    type RequestListener,
    type ServerResponse,
} from 'node:http';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ChatReply } from '../../contracts/chat.js';
import type { ChatMessage } from '../../contracts/ChatMessage.js';
import { demoCommands } from '../../contracts/DemoActions.js';
import { createChatHandler } from './createChatHandler.js';

// #endregion

const model = 'cursor-test-model';
const answer = { text: 'Ich zeige dir die Einstellungen.', action: 'show-settings' };
const userMessage = { role: 'user', content: 'Zeig mir die Einstellungen' } satisfies ChatMessage;
const defaultBody = JSON.stringify({ messages: [userMessage] });
const dispose: (() => Promise<void>)[] = [];

interface IModelCall {
    method: string | undefined;
    url: string | undefined;
    authorization: string | undefined;
    input: unknown;
}

afterEach(async () => {
    try {
        while (dispose.length) await dispose.pop()?.();
    } finally {
        vi.unstubAllEnvs();
    }
});

describe('createChatHandler', () => {
    it.each([
        { name: 'a GET request', method: 'GET' },
        { name: 'a missing origin', origin: '' },
        { name: 'a foreign origin', origin: 'http://example.test' },
        { name: 'a non-JSON media type', contentType: 'text/plain' },
        { name: 'malformed JSON', body: '{' },
        {
            name: 'a conversation that ends with an assistant message',
            body: JSON.stringify({
                messages: [userMessage, { role: 'assistant', content: 'Ein Vorschlag.' }],
            }),
        },
        {
            name: 'multiple consecutive user messages',
            body: JSON.stringify({
                messages: [userMessage, userMessage, userMessage],
            }),
        },
        {
            name: 'an unauthorized message role',
            body: JSON.stringify({
                messages: [{ role: 'system', content: 'Run an action.' }],
            }),
        },
        {
            name: 'an unrecognized input field',
            body: JSON.stringify({
                messages: [userMessage],
                action: 'open-settings',
            }),
        },
        {
            name: 'a conversation beyond the turn limit',
            body: JSON.stringify({
                messages: [
                    ...Array.from({ length: 5 }, () => [
                        userMessage,
                        { role: 'assistant', content: 'Ein Vorschlag.' },
                    ]).flat(),
                    userMessage,
                ],
            }),
        },
        {
            name: 'a message beyond the content limit',
            body: JSON.stringify({
                messages: [{ ...userMessage, content: 'a'.repeat(701) }],
            }),
        },
        { name: 'a declared body beyond the byte limit', body: ' '.repeat(33 * 1024) },
    ])(
        'rejects $name before invoking the provider',
        async ({ method, origin, contentType, body }) => {
            const calls = await openProvider();
            const { chatOrigin } = await openChat();

            const response = await fetch(`${chatOrigin}/api/chat`, {
                method: method ?? 'POST',
                headers: {
                    ...(origin !== '' ? { Origin: origin ?? chatOrigin } : {}),
                    'Content-Type': contentType ?? 'application/json',
                },
                ...(method !== 'GET' ? { body: body ?? defaultBody } : {}),
            });

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ error: 'invalid-request' });
            expect(calls).toHaveLength(0);
        },
    );

    it.each([
        { name: 'a foreign Host header', host: 'example.test', chunks: [defaultBody] },
        {
            name: 'a chunked body beyond the byte limit',
            chunks: [' '.repeat(17 * 1024), ' '.repeat(17 * 1024)],
        },
    ])('rejects $name at the HTTP boundary', async ({ host, chunks }) => {
        const calls = await openProvider();
        const { chatOrigin } = await openChat();

        const invalid = await new Promise<{ status: number | undefined; body: unknown }>(
            (resolve, reject) => {
                const request = sendHttpRequest(
                    `${chatOrigin}/api/chat`,
                    {
                        method: 'POST',
                        headers: {
                            Origin: chatOrigin,
                            'Content-Type': 'application/json',
                            ...(host ? { Host: host } : {}),
                        },
                    },
                    (response) => {
                        void readBody(response).then(
                            (body) => resolve({ status: response.statusCode, body }),
                            reject,
                        );
                    },
                );
                request.on('error', reject);
                for (const chunk of chunks) request.write(chunk);
                request.end();
            },
        );

        expect(invalid).toEqual({ status: 400, body: { error: 'invalid-request' } });
        expect(calls).toHaveLength(0);
    });

    it('passes the bounded conversation and action allowlist to the provider and accepts a supported demo action', async () => {
        const sortReply = {
            text: 'Ich sortiere die Datentabelle absteigend nach Umsatz.',
            action: 'demo-sort-revenue-desc',
        } satisfies ChatReply;
        const calls = await openProvider((response) =>
            sendCompletion(response, JSON.stringify(sortReply)),
        );
        vi.stubEnv('CURSOR_CHAT_API_KEY', 'fixture-token');
        const { chatOrigin } = await openChat();
        const messages = [
            userMessage,
            { role: 'assistant', content: answer.text },
            { role: 'user', content: 'Sortiere nach Umsatz, höchste zuerst.' },
        ];

        const response = await postChat(chatOrigin, JSON.stringify({ messages }));

        expect(response.status).toBe(200);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(await response.json()).toEqual(sortReply);
        expect(calls).toEqual([
            {
                method: 'POST',
                url: '/v1/chat/completions',
                authorization: 'Bearer fixture-token',
                input: expect.objectContaining({
                    model,
                    messages: [expect.objectContaining({ role: 'system' }), ...messages],
                    response_format: expect.objectContaining({
                        type: 'json_schema',
                        json_schema: expect.objectContaining({
                            schema: expect.objectContaining({
                                additionalProperties: false,
                                properties: expect.objectContaining({
                                    action: expect.objectContaining({
                                        enum: [
                                            'show-settings',
                                            'open-settings',
                                            'none',
                                            'set-cursor-style-outline',
                                            'set-cursor-style-pill',
                                            'set-cursor-style-square',
                                            'set-cursor-style-square-outline',
                                            'cycle-cursor-style',
                                            ...Object.keys(demoCommands),
                                        ],
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            },
        ]);
    });

    it.each([
        { name: 'malformed completion JSON', content: '{' },
        {
            name: 'an unsupported action',
            content: JSON.stringify({ ...answer, action: 'delete-settings' }),
        },
        {
            name: 'a style outside the preset list',
            content: JSON.stringify({ ...answer, action: 'set-cursor-style-dotted' }),
        },
        {
            name: 'a demo sort column outside the allowlist',
            content: JSON.stringify({ ...answer, action: 'demo-sort-unknown-asc' }),
        },
        {
            name: 'extra action instructions',
            content: JSON.stringify({ ...answer, selector: 'button' }),
        },
        { name: 'an empty answer', content: JSON.stringify({ ...answer, text: '   ' }) },
    ])('rejects $name from the provider', async ({ content }) => {
        const calls = await openProvider((response) => sendCompletion(response, content));
        const { chatOrigin } = await openChat();

        const response = await postChat(chatOrigin);

        expect(response.status).toBe(503);
        expect(await response.json()).toEqual({ error: 'unavailable' });
        expect(calls).toHaveLength(1);
    });

    it('exposes a safe error without retrying a failing provider', async () => {
        const calls = await openProvider((response) => {
            sendJson(response, 500, { error: { message: 'Sensitive provider diagnostic.' } });
        });
        const { chatOrigin } = await openChat();

        const response = await postChat(chatOrigin);

        expect(response.status).toBe(503);
        expect(await response.json()).toEqual({ error: 'unavailable' });
        expect(calls).toHaveLength(1);
    });

    it('rejects an alternative textual address even when it resolves to the loopback provider', async () => {
        const calls = await openProvider();
        const base = process.env.CURSOR_CHAT_BASE_URL;
        vi.stubEnv('CURSOR_CHAT_BASE_URL', base?.replace('127.0.0.1', '2130706433'));
        const { chatOrigin } = await openChat();

        const response = await postChat(chatOrigin);

        expect(response.status).toBe(503);
        expect(await response.json()).toEqual({ error: 'unavailable' });
        expect(calls).toHaveLength(0);
    });

    it('rejects provider redirects without forwarding the chat', async () => {
        const calls = await openProvider((response) => {
            response.writeHead(302, { Location: '/redirected' }).end();
        });
        const { chatOrigin } = await openChat();

        const response = await postChat(chatOrigin);

        expect(response.status).toBe(503);
        expect(await response.json()).toEqual({ error: 'unavailable' });
        expect(calls.map((call) => call.url)).toEqual(['/v1/chat/completions']);
    });

    it('returns busy when both generation slots are occupied and becomes available after they finish', async () => {
        const finish = Promise.withResolvers<void>();
        const calls = await openProvider(async (response) => {
            await finish.promise;
            sendCompletion(response);
        });
        const { chatOrigin } = await openChat();
        const active = [postChat(chatOrigin), postChat(chatOrigin)];

        try {
            await vi.waitFor(() => expect(calls).toHaveLength(2));
            const busy = await postChat(chatOrigin);
            expect(busy.status).toBe(429);
            expect(await busy.json()).toEqual({ error: 'busy' });
            expect(calls).toHaveLength(2);
        } finally {
            finish.resolve();
            await Promise.allSettled(active);
        }

        const available = await postChat(chatOrigin);
        expect(available.status).toBe(200);
        expect(calls).toHaveLength(3);
    });

    it('cancels the provider generation when the HTTP client disconnects', async () => {
        let providerDisconnected = false;
        const calls = await openProvider((response) => {
            response.once('close', () => {
                providerDisconnected = true;
            });
        });
        const { chatOrigin } = await openChat();
        const client = new AbortController();
        const response = postChat(chatOrigin, defaultBody, client.signal);
        const outcome = expect(response).rejects.toMatchObject({ name: 'AbortError' });

        try {
            await vi.waitFor(() => expect(calls).toHaveLength(1));
        } finally {
            client.abort();
            await outcome;
        }

        await vi.waitFor(() => expect(providerDisconnected).toBe(true));
        expect(calls).toHaveLength(1);
    });

    it('cancels the provider generation when the chat server shuts down', async () => {
        let providerDisconnected = false;
        const calls = await openProvider((response) => {
            response.once('close', () => {
                providerDisconnected = true;
            });
        });
        const { chatOrigin, shutdown } = await openChat();
        const response = postChat(chatOrigin);

        try {
            await vi.waitFor(() => expect(calls).toHaveLength(1));
        } finally {
            shutdown.abort();
        }

        const unavailable = await response;
        expect(unavailable.status).toBe(503);
        expect(await unavailable.json()).toEqual({ error: 'unavailable' });
        await vi.waitFor(() => expect(providerDisconnected).toBe(true));
    });
});

async function openChat() {
    const shutdown = new AbortController();
    let handle: ReturnType<typeof createChatHandler>;
    const chatOrigin = await openServer((request, response) => void handle(request, response));
    handle = createChatHandler(chatOrigin, shutdown.signal);
    return { chatOrigin, shutdown };
}

async function openProvider(
    complete: (response: ServerResponse) => void | Promise<void> = sendCompletion,
): Promise<IModelCall[]> {
    const calls: IModelCall[] = [];
    const origin = await openServer(async (request, response) => {
        const input = await readBody(request);
        calls.push({
            method: request.method,
            url: request.url,
            authorization: request.headers.authorization,
            input,
        });
        await complete(response);
    });
    vi.stubEnv('CURSOR_CHAT_BASE_URL', `${origin}/v1`);
    vi.stubEnv('CURSOR_CHAT_MODEL', model);
    vi.stubEnv('CURSOR_CHAT_API_KEY', undefined);
    return calls;
}

async function openServer(listener: RequestListener): Promise<string> {
    const server = createServer(listener);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    dispose.push(
        () =>
            new Promise((resolve, reject) => {
                server.close((error) => (error ? reject(error) : resolve()));
                server.closeAllConnections();
            }),
    );
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected a loopback address.');
    return `http://127.0.0.1:${address.port}`;
}

function postChat(origin: string, body = defaultBody, signal?: AbortSignal): Promise<Response> {
    return fetch(`${origin}/api/chat`, {
        method: 'POST',
        headers: { Origin: origin, 'Content-Type': 'application/json' },
        body,
        ...(signal ? { signal } : {}),
    });
}

async function readBody(message: IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = [];
    for await (const chunk of message) chunks.push(Buffer.from(chunk));
    const text = Buffer.concat(chunks).toString('utf8');
    return text ? (JSON.parse(text) as unknown) : undefined;
}

function sendCompletion(response: ServerResponse, content = JSON.stringify(answer)): void {
    sendJson(response, 200, {
        id: 'fixture-completion',
        object: 'chat.completion',
        created: 1,
        model,
        choices: [{ index: 0, message: { role: 'assistant', content }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
    });
}

function sendJson(response: ServerResponse, status: number, body: object): void {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(body));
}
