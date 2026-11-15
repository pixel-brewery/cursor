// #region Imports

import type { IncomingMessage, ServerResponse } from 'node:http';
import { addAbortSignal } from 'node:stream';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText, Output } from 'ai';
import { chatReplySchema, chatRequestSchema, type ChatReply } from '../../contracts/chat.js';

// #endregion

const maxBodyBytes = 32 * 1024;
const bodyTimeoutMs = 5_000;
const modelTimeoutMs = 30_000;
const maxConcurrentGenerations = 2;

const instructions = `You are the assistant in the Cursor reference app.
Write a short conversational reply in the user's language. Address the user instead of repeating their message.
Select exactly one action based on what the latest user message asks you to do:
- show-settings: the user asks to see or be shown where the Settings control is. The app will point to it and leave it closed.
- open-settings: the user explicitly asks you to open Settings. The app will point to it and then open it.
- none: regular conversation, questions about how Settings work, ambiguous requests, and all other actions.
Treat earlier messages as conversation context only. When proposing an action, describe what you are about to do. Never claim that an action has already happened.
You cannot read, change, save, or delete settings. You can only show the Settings control or ask the app to open it.

Examples:
User: Zeig mir die Einstellungen
Reply: {"text":"Ich zeige dir, wo die Einstellungen sind.","action":"show-settings"}
User: Öffne die Einstellungen
Reply: {"text":"Ich öffne die Einstellungen für dich.","action":"open-settings"}
User: Was kannst du hier tun?
Reply: {"text":"Ich kann dir die Einstellungen zeigen oder sie für dich öffnen.","action":"none"}`;

type ChatBody = ChatReply | { error: 'invalid-request' | 'unavailable' | 'busy' };

/**
 * Creates the reference app's same-origin chat handler with one local model configuration.
 *
 * @param origin - Exact loopback origin serving the reference renderer.
 * @param shutdown - Aborts active requests when the owning reference server closes.
 * @returns An HTTP handler for the chat route.
 * @internal
 */
export function createChatHandler(
    origin: string,
    shutdown: AbortSignal,
): (request: IncomingMessage, response: ServerResponse) => Promise<void> {
    const host = new URL(origin).host;
    const model = createChatModel();
    let activeGenerations = 0;

    return async (request, response) => {
        const mediaType = request.headers['content-type']?.split(';', 1)[0]?.trim().toLowerCase();
        if (
            request.method !== 'POST' ||
            request.headers.host !== host ||
            request.headers.origin !== origin ||
            mediaType !== 'application/json'
        ) {
            sendJson(request, response, 400, { error: 'invalid-request' });
            return;
        }

        const parsed = chatRequestSchema.safeParse(await readJson(request, shutdown));
        if (!parsed.success) {
            sendJson(request, response, 400, { error: 'invalid-request' });
            return;
        }
        if (response.destroyed) return;
        if (!model || shutdown.aborted) {
            sendJson(request, response, 503, { error: 'unavailable' });
            return;
        }
        if (activeGenerations >= maxConcurrentGenerations) {
            sendJson(request, response, 429, { error: 'busy' });
            return;
        }

        const disconnected = new AbortController();
        const abort = () => disconnected.abort();
        response.once('close', abort);
        activeGenerations += 1;
        try {
            const result = await generateText({
                model,
                instructions,
                messages: parsed.data.messages,
                output: Output.object({ schema: chatReplySchema }),
                maxOutputTokens: 256,
                maxRetries: 0,
                temperature: 0,
                abortSignal: AbortSignal.any([
                    shutdown,
                    disconnected.signal,
                    AbortSignal.timeout(modelTimeoutMs),
                ]),
            });
            sendJson(request, response, 200, result.output);
        } catch {
            sendJson(request, response, 503, { error: 'unavailable' });
        } finally {
            response.off('close', abort);
            activeGenerations -= 1;
        }
    };
}

function createChatModel() {
    const configuredUrl = process.env.CURSOR_CHAT_BASE_URL ?? 'http://127.0.0.1:4318/v1';
    const baseUrl = URL.parse(configuredUrl);
    if (
        !baseUrl ||
        !/^http:\/\/127\.0\.0\.1(?::[0-9]{1,5})?(?:\/|$)/u.test(configuredUrl) ||
        baseUrl.hostname !== '127.0.0.1' ||
        baseUrl.search ||
        baseUrl.hash
    ) {
        return undefined;
    }
    const apiKey = process.env.CURSOR_CHAT_API_KEY;
    const provider = createOpenAICompatible({
        name: 'cursor-local',
        baseURL: baseUrl.href,
        ...(apiKey ? { apiKey } : {}),
        supportsStructuredOutputs: true,
        fetch: (input, init) => fetch(input, { ...init, redirect: 'error' }),
    });
    return provider.chatModel(process.env.CURSOR_CHAT_MODEL ?? 'cursor-model');
}

async function readJson(request: IncomingMessage, shutdown: AbortSignal): Promise<unknown> {
    if (Number(request.headers['content-length']) > maxBodyBytes) return undefined;

    const chunks: Buffer[] = [];
    let size = 0;
    const signal = AbortSignal.any([shutdown, AbortSignal.timeout(bodyTimeoutMs)]);
    const stream = addAbortSignal(signal, request);
    try {
        for await (const chunk of stream.iterator({ destroyOnReturn: false })) {
            if (!Buffer.isBuffer(chunk)) return undefined;
            size += chunk.length;
            if (size > maxBodyBytes) return undefined;
            chunks.push(chunk);
        }
        const text = new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks));
        return JSON.parse(text) as unknown;
    } catch {
        return undefined;
    }
}

function sendJson(
    request: IncomingMessage,
    response: ServerResponse,
    status: number,
    payload: ChatBody,
): void {
    if (response.destroyed) return;
    if (!request.complete) response.setHeader('Connection', 'close');
    response.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
    });
    response.end(JSON.stringify(payload));
}
