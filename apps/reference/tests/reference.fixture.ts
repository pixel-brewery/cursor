import assert from 'node:assert/strict';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { createServer as createPortProbe, type Server } from 'node:net';
import { expect, test as base } from '@playwright/test';
import type { ChatReply } from '../src/contracts/chat.js';
import type { IReferenceServer } from '../src/node/interfaces/IReferenceServer.js';
import { startReferenceServer } from '../src/node/services/startReferenceServer.js';

export { expect };

export const showPrompt = 'Zeig mir die Einstellungen';
export const openPrompt = 'Öffne die Einstellungen';
export const unrelatedPrompt = 'Wie viele Tage hat eine Woche?';
export const replies = new Map<string, ChatReply>([
    [showPrompt, { text: 'Ich zeige dir die Einstellungen.', action: 'show-settings' }],
    [openPrompt, { text: 'Ich öffne die Einstellungen.', action: 'open-settings' }],
    [unrelatedPrompt, { text: 'Eine Woche hat sieben Tage.', action: 'none' }],
]);

const liveEndpoint = process.env.CURSOR_CHAT_BASE_URL;
export const live = liveEndpoint !== undefined || process.env.CURSOR_LIVE_CHAT === '1';
const fixtureModel = 'cursor-acceptance';

interface IHeldCompletion {
    readonly started: Promise<void>;
    readonly disconnected: Promise<void>;
}

interface ICompletionFixture {
    readonly prompts: ReadonlyArray<string>;
    holdNext(prompt: string): IHeldCompletion;
}

interface IReferenceFixture extends IReferenceServer {
    readonly port: number;
    readonly completions: ICompletionFixture | undefined;
}

interface IProviderRequest {
    readonly model: string;
    readonly response_format?: { readonly type: string };
    readonly messages: ReadonlyArray<{ readonly role: string; readonly content: unknown }>;
}

async function listen(server: Server): Promise<number> {
    await new Promise<void>((resolve, reject) =>
        server.once('error', reject).listen(0, '127.0.0.1', resolve),
    );
    const address = server.address();
    assert(address && typeof address !== 'string');
    return address.port;
}

async function close(server: Server): Promise<void> {
    await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
    );
}

function createCompletionFixture() {
    const prompts: string[] = [];
    const errors: unknown[] = [];
    const held = new Map<
        string,
        {
            readonly started: PromiseWithResolvers<void>;
            readonly disconnected: PromiseWithResolvers<void>;
        }
    >();

    async function serve(request: IncomingMessage, response: ServerResponse): Promise<void> {
        response.setHeader('Content-Type', 'application/json');
        try {
            assert.equal(request.method, 'POST');
            assert.equal(request.url, '/v1/chat/completions');
            const chunks: Buffer[] = [];
            for await (const chunk of request) {
                assert(Buffer.isBuffer(chunk));
                chunks.push(chunk);
            }
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as IProviderRequest;
            assert.equal(body.model, fixtureModel);
            assert.equal(body.response_format?.type, 'json_schema');
            const history = body.messages.filter(({ role }) => role !== 'system');
            const last = history.at(-1);
            assert(last?.role === 'user' && typeof last.content === 'string');
            const prompt = last.content;
            const reply = replies.get(prompt);
            assert(reply, `Unexpected model prompt ${prompt}`);
            if (prompt === openPrompt) {
                assert.deepEqual(
                    history.slice(-3).map(({ role, content }) => ({ role, content })),
                    [
                        { role: 'user', content: showPrompt },
                        { role: 'assistant', content: replies.get(showPrompt)?.text },
                        { role: 'user', content: openPrompt },
                    ],
                    'The model receives the previous German turn and its response exactly once.',
                );
            }
            prompts.push(prompt);
            const pending = held.get(prompt);
            if (pending) {
                held.delete(prompt);
                response.once('close', () => pending.disconnected.resolve());
                pending.started.resolve();
                return;
            }
            response.end(
                JSON.stringify({
                    id: fixtureModel,
                    object: 'chat.completion',
                    created: 1,
                    model: fixtureModel,
                    choices: [
                        {
                            index: 0,
                            message: { role: 'assistant', content: JSON.stringify(reply) },
                            finish_reason: 'stop',
                        },
                    ],
                    usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
                }),
            );
        } catch (error) {
            errors.push(error);
            response.statusCode = 400;
            response.end(
                JSON.stringify({ error: { message: 'Unexpected acceptance request.' } }),
            );
        }
    }

    const server = createServer((request, response) => void serve(request, response));
    return {
        server,
        errors,
        completions: {
            prompts,
            holdNext(prompt: string): IHeldCompletion {
                const started = Promise.withResolvers<void>();
                const disconnected = Promise.withResolvers<void>();
                held.set(prompt, { started, disconnected });
                return { started: started.promise, disconnected: disconnected.promise };
            },
        },
    };
}

async function startRelay(port: number, baseUrl: string): Promise<IReferenceServer> {
    const model = process.env.CURSOR_CHAT_MODEL;
    const key = process.env.CURSOR_CHAT_API_KEY;
    process.env.CURSOR_CHAT_BASE_URL = baseUrl;
    process.env.CURSOR_CHAT_MODEL = live ? (model ?? 'cursor-model') : fixtureModel;
    if (!live) delete process.env.CURSOR_CHAT_API_KEY;
    try {
        return await startReferenceServer(port);
    } finally {
        if (liveEndpoint === undefined) delete process.env.CURSOR_CHAT_BASE_URL;
        else process.env.CURSOR_CHAT_BASE_URL = liveEndpoint;
        if (model === undefined) delete process.env.CURSOR_CHAT_MODEL;
        else process.env.CURSOR_CHAT_MODEL = model;
        if (key !== undefined) process.env.CURSOR_CHAT_API_KEY = key;
    }
}

export const test = base.extend<{ reference: IReferenceFixture }>({
    reference: async ({}, use) => {
        const probe = createPortProbe();
        const port = await listen(probe);
        await close(probe);

        const provider = live ? undefined : createCompletionFixture();
        let relay: IReferenceServer | undefined;
        try {
            const endpoint = provider
                ? `http://127.0.0.1:${await listen(provider.server)}/v1`
                : (liveEndpoint ?? 'http://127.0.0.1:4318/v1');
            relay = await startRelay(port, endpoint);
            await use({ ...relay, port, completions: provider?.completions });
            expect(provider?.errors ?? [], 'The AI SDK sent valid model requests').toEqual([]);
        } finally {
            try {
                await relay?.close();
            } finally {
                if (provider?.server.listening) {
                    provider.server.closeAllConnections();
                    await close(provider.server);
                }
            }
        }
    },
});
