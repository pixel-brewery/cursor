// #region Imports

import { chmod, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { delimiter, join, relative } from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';
import type { ChatMessage } from '../../contracts/ChatMessage.js';
import type { ChatReply } from '../../contracts/chat.js';
import { LocalAssistant } from './LocalAssistant.js';

// #endregion

const message = { role: 'user', content: 'Öffne die Einstellungen' } satisfies ChatMessage;
const reply = { text: 'Ich öffne die Einstellungen.', action: 'open-settings' } satisfies ChatReply;
const selection = { provider: 'codex', model: 'fixture-model' } as const;
const cleanup: Array<() => Promise<void>> = [];

afterEach(async () => {
    try {
        while (cleanup.length) await cleanup.pop()?.();
    } finally {
        vi.unstubAllEnvs();
    }
});

test('checks but never signs in implicitly and cancels an explicit native operation', async () => {
    const fixture = await openFixture();
    const assistant = fixture.createAssistant();

    await expect(assistant.getState()).resolves.toEqual({
        connection: null,
        status: 'unchecked',
        methods: [],
        login: null,
    });
    await expect(assistant.save(selection)).resolves.toMatchObject({
        connection: selection,
        status: 'signed-out',
        methods: [{ id: 'chatgpt-browser' }, { id: 'chatgpt-device' }],
        login: null,
    });
    await expect(assistant.chat([message], new AbortController().signal)).rejects.toThrow();
    await expect(assistant.startLogin('api-key')).rejects.toThrow();
    expect(await fixture.calls()).toMatchObject([{ args: ['login', 'status'] }]);

    await assistant.startLogin('chatgpt-browser');
    await vi.waitFor(async () =>
        expect(await assistant.getState()).toMatchObject({
            status: 'signed-out',
            login: { state: 'waiting', interaction: { hasUrl: true, fields: [] } },
        }),
    );
    expect(assistant.getLoginUrl()).toBe('https://auth.openai.com/oauth/authorize?state=fixture');
    await expect(assistant.cancelLogin()).resolves.toMatchObject({
        status: 'signed-out',
        login: { state: 'cancelled' },
    });
    expect(assistant.getLoginUrl()).toBeUndefined();
    expect(await fixture.calls()).toMatchObject([
        { args: ['login', 'status'] },
        { args: ['login'] },
    ]);
});

test('verifies a completed native sign-in, stores the selection and runs a read-only structured chat after restart', async () => {
    const fixture = await openFixture();
    const assistant = fixture.createAssistant();
    vi.stubEnv('OPENAI_API_KEY', 'ambient-not-owned-by-cursor');
    await assistant.save(selection);
    await assistant.startLogin('chatgpt-browser');
    await fixture.completeLogin();

    await vi.waitFor(async () =>
        expect(await assistant.getState()).toMatchObject({
            status: 'ready',
            login: { state: 'succeeded' },
        }),
    );
    await assistant.dispose();
    const reopened = fixture.createAssistant();

    await expect(reopened.getState()).resolves.toMatchObject({
        connection: selection,
        status: 'unchecked',
        login: null,
    });
    await expect(reopened.check()).resolves.toMatchObject({ status: 'ready' });
    await expect(reopened.chat([message], new AbortController().signal)).resolves.toEqual(reply);
    expect(
        JSON.parse(
            await readFile(join(fixture.userData, 'local-assistant', 'connection.json'), 'utf8'),
        ),
    ).toEqual(selection);

    const calls = await fixture.calls();
    const chat = calls.find(({ args }) => args[0] === 'exec');
    expect(chat).toMatchObject({
        args: expect.arrayContaining(['--sandbox', 'read-only', '--model', 'fixture-model']),
        prompt: expect.stringContaining(JSON.stringify([message])),
        outputSchema: {
            additionalProperties: false,
            properties: {
                action: {
                    enum: [
                        'show-settings',
                        'open-settings',
                        'none',
                        'set-cursor-style-outline',
                        'set-cursor-style-pill',
                        'set-cursor-style-square',
                        'set-cursor-style-square-outline',
                        'cycle-cursor-style',
                    ],
                },
            },
        },
    });
    for (const call of calls) {
        expect(relative(fixture.userData, call.home)).toMatch(
            /^local-assistant[/\\]profiles[/\\]/u,
        );
        expect(call.inheritedCredential).toBe(false);
    }
});

test('rejects an unregistered model action at the native output boundary', async () => {
    const fixture = await openFixture({ text: 'Open an arbitrary page.', action: 'open-website' });
    const assistant = fixture.createAssistant();
    await assistant.save(selection);
    await assistant.startLogin('chatgpt-browser');
    await fixture.completeLogin();
    await vi.waitFor(async () => expect((await assistant.getState()).status).toBe('ready'));

    await expect(assistant.chat([message], new AbortController().signal)).rejects.toThrow();
    expect((await fixture.calls()).filter(({ args }) => args[0] === 'exec')).toHaveLength(1);
});

test('accepts a browser authorization code only for the current native Claude interaction', async () => {
    const fixture = await openFixture();
    await installNativeFixture(
        fixture.root,
        'claude',
        `
const { access, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');
const marker = join(process.env.CLAUDE_CONFIG_DIR, 'fixture-authenticated');
const args = process.argv.slice(2).join(' ');

if (args === 'auth status --json') {
    const loggedIn = await access(marker).then(() => true, () => false);
    console.log(JSON.stringify({ loggedIn, authMethod: 'claude.ai' }));
} else if (args === 'auth login --claudeai') {
    console.log('https://claude.ai/oauth/authorize?state=fixture');
    process.stdin.setEncoding('utf8');
    let input = '';
    for await (const chunk of process.stdin) input += chunk;
    if (input !== 'fixture-authorization-code\\n') process.exit(1);
    await writeFile(marker, '');
} else {
    process.exitCode = 1;
}
`,
    );
    const assistant = fixture.createAssistant();
    await expect(assistant.save({ provider: 'claude' })).resolves.toMatchObject({
        status: 'signed-out',
    });
    await assistant.startLogin('subscription');
    const login = await vi.waitFor(async () => {
        const { login } = await assistant.getState();
        if (!login || login.state !== 'waiting' || !login.interaction)
            throw new Error('Native login is not waiting for the authorization code.');
        return { operationId: login.operationId, interaction: login.interaction };
    });
    expect(login.interaction.fields).toEqual([
        { id: 'authorizationCode', label: 'Authorization code', secret: true, required: false },
    ]);

    const response = {
        operationId: login.operationId,
        interactionId: login.interaction.id,
        values: { authorizationCode: 'fixture-authorization-code' },
    };
    await expect(
        assistant.respondLogin({ ...response, interactionId: 'obsolete' }),
    ).rejects.toThrow();
    await expect(
        assistant.respondLogin({
            ...response,
            values: { authorizationCode: 'fixture\nextra-input' },
        }),
    ).rejects.toThrow();
    await assistant.respondLogin(response);

    await vi.waitFor(async () =>
        expect(await assistant.getState()).toMatchObject({
            status: 'ready',
            login: { state: 'succeeded' },
        }),
    );
    const stored = await readFile(
        join(fixture.userData, 'local-assistant', 'connection.json'),
        'utf8',
    );
    expect(JSON.parse(stored)).toEqual({ provider: 'claude' });
    expect(stored).not.toContain(response.values.authorizationCode);
});

test('runs OpenCode with the configured native method and model in its isolated profile', async () => {
    const fixture = await openFixture();
    await installNativeFixture(
        fixture.root,
        'opencode',
        `
const { mkdir, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');
const args = process.argv.slice(2);
const directory = join(process.env.HOME, '.local', 'share', 'opencode');
if (args.join(' ') === '--pure auth list') {
    process.exitCode = 0;
} else if (args.join(' ') === '--pure auth login --provider fixture --method Browser login') {
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'auth.json'), JSON.stringify({
        fixture: { type: 'oauth', access: 'fixture', refresh: 'fixture', expires: 0 }
    }));
} else if (args[1] === 'run' && args[args.indexOf('--model') + 1] === 'fixture/test-model' &&
    args[args.indexOf('--agent') + 1] === 'plan') {
    process.stdin.resume();
    for await (const chunk of process.stdin) { /* Drain the structured prompt. */ }
    console.log(JSON.stringify({ type: 'text', part: { text: ${JSON.stringify(JSON.stringify(reply))} } }));
} else {
    process.exitCode = 23;
}
`,
    );
    const assistant = fixture.createAssistant();
    const connection = {
        provider: 'opencode',
        providerId: 'fixture',
        model: 'fixture/test-model',
        authMethod: 'Browser login',
    } as const;

    await expect(assistant.save(connection)).resolves.toMatchObject({
        status: 'signed-out',
        methods: [{ id: 'native' }],
    });
    await assistant.startLogin('native');
    await vi.waitFor(async () => expect((await assistant.getState()).status).toBe('ready'));
    await expect(assistant.chat([message], new AbortController().signal)).resolves.toEqual(reply);
    await expect(
        assistant.save({
            ...connection,
            providerId: 'other',
            model: 'other/test-model',
        }),
    ).resolves.toMatchObject({ status: 'signed-out' });
});

interface INativeCall {
    readonly args: readonly string[];
    readonly home: string;
    readonly inheritedCredential: boolean;
    readonly prompt?: string;
    readonly outputSchema?: unknown;
}

async function openFixture(chatReply: { readonly text: string; readonly action: string } = reply) {
    const root = await realpath(await mkdtemp(join(tmpdir(), 'cursor-native-spec-')));
    cleanup.push(() => rm(root, { recursive: true, force: true }));
    const userData = join(root, 'user-data');
    const releaseLogin = join(root, 'authenticated');
    const log = join(root, 'calls.jsonl');

    await installNativeFixture(
        root,
        'codex',
        `
const { appendFile, access, readFile, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');
const { setTimeout } = await import('node:timers/promises');

const auth = join(process.env.CODEX_HOME, 'auth.json');
const args = process.argv.slice(2);
const call = { args, home: process.env.HOME, inheritedCredential: Boolean(process.env.OPENAI_API_KEY) };
const record = async () => appendFile(${JSON.stringify(log)}, JSON.stringify(call) + '\\n');
const exists = (path) => access(path).then(() => true, () => false);

if (args[0] === 'login' && args[1] === 'status') {
    await record();
    if (!await exists(auth)) process.exit(1);
    console.log('Logged in using ChatGPT');
} else if (args[0] === 'login' && args.length === 1) {
    await record();
    console.log('https://auth.openai.com/oauth/authorize?state=fixture');
    while (!await exists(${JSON.stringify(releaseLogin)})) await setTimeout(20);
    await writeFile(auth, '{"auth_mode":"chatgpt"}');
} else if (args[0] === 'exec') {
    process.stdin.setEncoding('utf8');
    call.prompt = '';
    for await (const chunk of process.stdin) call.prompt += chunk;
    const schemaFile = args[args.indexOf('--output-schema') + 1];
    call.outputSchema = JSON.parse(await readFile(schemaFile, 'utf8'));
    await record();
    console.log(JSON.stringify({
        type: 'item.completed',
        item: { type: 'agent_message', text: ${JSON.stringify(JSON.stringify(chatReply))} }
    }));
    console.log(JSON.stringify({ type: 'turn.completed' }));
} else {
    process.exitCode = 1;
}
`,
    );
    vi.stubEnv('PATH', [root, process.env.PATH].join(delimiter));

    return {
        root,
        userData,
        createAssistant() {
            const assistant = new LocalAssistant(userData);
            cleanup.push(() => assistant.dispose());
            return assistant;
        },
        completeLogin: () => writeFile(releaseLogin, ''),
        async calls(): Promise<INativeCall[]> {
            return (await readFile(log, 'utf8'))
                .trim()
                .split('\n')
                .map((line) => JSON.parse(line) as INativeCall);
        },
    };
}

async function installNativeFixture(
    root: string,
    provider: 'codex' | 'claude' | 'opencode',
    script: string,
) {
    const executable = join(root, provider);
    const binary = process.platform === 'win32' ? `${executable}.mjs` : executable;
    await writeFile(binary, `#!/usr/bin/env node${script}`);
    if (process.platform === 'win32') {
        await writeFile(
            `${executable}.cmd`,
            `@echo off\r\n"${process.execPath}" "${binary}" %*\r\n`,
        );
    } else {
        await chmod(binary, 0o700);
    }
}
