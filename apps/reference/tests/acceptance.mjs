import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createServer as createHttpServer } from 'node:http';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { _electron as electron, chromium } from 'playwright';
import { startReferenceServer } from '../dist/node/services/startReferenceServer.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const screenshotDirectory = process.env.CURSOR_SCREENSHOT_DIR;
const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const showPrompt = 'Zeig mir die Einstellungen';
const openPrompt = 'Öffne die Einstellungen';
const unrelatedPrompt = 'Wie viele Tage hat eine Woche?';
const replies = new Map([
    [showPrompt, { text: 'Ich zeige dir die Einstellungen.', action: 'show-settings' }],
    [openPrompt, { text: 'Ich öffne die Einstellungen.', action: 'open-settings' }],
    [unrelatedPrompt, { text: 'Eine Woche hat sieben Tage.', action: 'none' }],
]);
const live = process.env.CURSOR_CHAT_BASE_URL !== undefined || process.env.CURSOR_LIVE_CHAT === '1';
const model = live ? (process.env.CURSOR_CHAT_MODEL ?? 'cursor-model') : 'cursor-acceptance';
const observedPrompts = [];
const providerErrors = [];
const portProbe = createServer();
await new Promise((resolve, reject) =>
    portProbe.once('error', reject).listen(0, '127.0.0.1', resolve),
);
const { port } = portProbe.address();
await new Promise((resolve, reject) =>
    portProbe.close((error) => (error ? reject(error) : resolve())),
);

if (screenshotDirectory) await mkdir(screenshotDirectory, { recursive: true });
let relay;
let provider;
let browser;
const errors = [];

async function serveCompletion(request, response) {
    response.setHeader('Content-Type', 'application/json');
    try {
        assert.equal(request.method, 'POST');
        assert.equal(request.url, '/v1/chat/completions');
        const chunks = [];
        for await (const chunk of request) chunks.push(chunk);
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        assert.equal(body.model, model);
        assert.equal(body.response_format?.type, 'json_schema');
        const conversation = body.messages.filter(({ role }) => role !== 'system');
        const last = conversation.at(-1);
        assert.equal(last?.role, 'user');
        const reply = replies.get(last.content);
        assert(reply, `Unexpected provider message: ${last.content}`);
        if (last.content === openPrompt) {
            assert.deepEqual(
                conversation.slice(-3).map(({ role, content }) => ({ role, content })),
                [
                    { role: 'user', content: showPrompt },
                    { role: 'assistant', content: replies.get(showPrompt).text },
                    { role: 'user', content: openPrompt },
                ],
                'The model receives the preceding German chat turn and its response.',
            );
        }
        observedPrompts.push(last.content);
        response.end(
            JSON.stringify({
                id: 'cursor-acceptance',
                object: 'chat.completion',
                created: 1,
                model,
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
        providerErrors.push(error);
        response.statusCode = 400;
        response.end(JSON.stringify({ error: { message: 'Unexpected acceptance request.' } }));
    }
}

function observe(page) {
    page.on('pageerror', (error) => errors.push(error.stack ?? error.message));
}

async function waitForParticipants(page, count) {
    await page.locator(`[data-testid="connection-status"][data-connected="${count}"]`).waitFor();
}

async function moveInside(page) {
    const area = await page.getByTestId('pointer-area').boundingBox();
    assert(area);
    await page.mouse.move(area.x + area.width / 2, area.y + area.height / 2);
}

async function expectTargetAlignment(page, pointer) {
    const target = page.getByTestId('settings');
    const targetBox = await target.boundingBox();
    const pointerBox = await pointer.boundingBox();
    assert(targetBox && pointerBox, 'Expected target and pointer bounding boxes.');
    const center = targetBox.x + targetBox.width / 2;
    assert(
        Math.abs(pointerBox.x - center) <= 35,
        `Pointer projects to receiver's target: ${pointerBox.x} vs ${center}.`,
    );
}

async function assertBothHumans(page) {
    const local = page.locator('[data-cursor-kind="human"][data-cursor-local]');
    const remote = page.locator('[data-cursor-kind="human"]:not([data-cursor-local])');
    await local.waitFor();
    await remote.waitFor();
    assert.notEqual(await local.innerText(), await remote.innerText());
    return remote;
}

async function sendChat(page, prompt, keyboard = false) {
    const input = page.getByTestId('assistant-input').locator('textarea');
    await input.fill(prompt);
    if (keyboard) await input.press('Enter');
    else await page.getByTestId('assistant-send').locator('button').click();
}

async function expectReply(page, number, prompt) {
    const reply = page
        .getByTestId('assistant-chat')
        .getByTestId('assistant-reply')
        .nth(number - 1);
    await reply.waitFor();
    const text = await reply.evaluate((element) => element.text.trim());
    assert(text, 'The chat renders the model response.');
    assert.notEqual(text, prompt, 'The assistant replies to the request.');
    if (!live) assert.equal(text, replies.get(prompt).text);
}

async function showAndOpenSettings(page, precedingReplies = 0) {
    const assistant = page.locator(
        '[data-cursor-kind="assistant"][data-cursor-target="settings"][data-cursor-arrived]',
    );
    const panel = page.getByTestId('settings-panel');
    await sendChat(page, showPrompt);
    await assistant.waitFor();
    await expectReply(page, precedingReplies + 1, showPrompt);
    await expectTargetAlignment(page, assistant);
    assert.equal(
        await panel.isVisible(),
        false,
        'Showing the control must leave its panel closed.',
    );
    await moveInside(page);
    await assertBothHumans(page);

    await sendChat(page, openPrompt, true);
    await panel.waitFor();
    await expectReply(page, precedingReplies + 2, openPrompt);
    assert.equal(await panel.getAttribute('data-open-count'), '1');
    assert.equal(await page.getByTestId('settings').getAttribute('aria-expanded'), 'true');
}

try {
    if (live) {
        process.env.CURSOR_CHAT_BASE_URL ??= 'http://127.0.0.1:4318/v1';
    } else {
        provider = createHttpServer(serveCompletion);
        await new Promise((resolve, reject) =>
            provider.once('error', reject).listen(0, '127.0.0.1', resolve),
        );
        process.env.CURSOR_CHAT_BASE_URL = `http://127.0.0.1:${provider.address().port}/v1`;
    }
    process.env.CURSOR_CHAT_MODEL = model;
    relay = await startReferenceServer(port);
    browser = await chromium.launch(
        chromiumExecutable ? { executablePath: chromiumExecutable } : {},
    );
    const first = await browser.newPage({ viewport: { width: 1200, height: 800 } });
    const second = await browser.newPage({ viewport: { width: 900, height: 740 } });
    observe(first);
    observe(second);
    await Promise.all([first.goto(relay.origin), second.goto(relay.origin)]);
    await Promise.all([waitForParticipants(first, 2), waitForParticipants(second, 2)]);

    await moveInside(first);
    await moveInside(second);
    await assertBothHumans(first);
    await assertBothHumans(second);
    if (!live) {
        await sendChat(first, unrelatedPrompt);
        await expectReply(first, 1, unrelatedPrompt);
        assert.equal(await first.locator('[data-cursor-kind="assistant"]').count(), 0);
        assert.equal(await first.getByTestId('settings-panel').isVisible(), false);
    }
    await showAndOpenSettings(first, live ? 0 : 1);
    assert.equal(await second.getByTestId('settings-panel').isVisible(), false);
    assert.equal(await second.locator('[data-cursor-kind="assistant"]').count(), 0);
    await showAndOpenSettings(second);
    if (screenshotDirectory)
        await first.screenshot({ path: join(screenshotDirectory, 'browser.png') });

    await second.mouse.move(1, 1);
    await first
        .locator('[data-cursor-kind="human"]:not([data-cursor-local])')
        .waitFor({ state: 'detached' });
    await moveInside(second);
    await assertBothHumans(first);
    await second.close();
    await waitForParticipants(first, 1);
    await first
        .locator('[data-cursor-kind="human"]:not([data-cursor-local])')
        .waitFor({ state: 'detached' });
    await first.close();
    console.log(
        'Both browser views submitted German chat turns and showed both humans and the assistant. Leave and departure passed.',
    );

    const electronApp = await electron.launch({
        args: [root],
        env: { ...process.env, CURSOR_REFERENCE_PORT: String(port) },
        timeout: 30_000,
    });
    try {
        const desktop = await electronApp.firstWindow();
        observe(desktop);
        const web = await browser.newPage({
            viewport: { width: 580, height: 690 },
            reducedMotion: 'reduce',
        });
        observe(web);
        await web.goto(relay.origin);
        await Promise.all([waitForParticipants(web, 2), waitForParticipants(desktop, 2)]);

        await moveInside(web);
        await desktop.getByTestId('settings').hover();
        const remote = await assertBothHumans(web);
        assert.match(await remote.innerText(), /Electron/);
        await remote.and(web.locator('[data-cursor-target="settings"]')).waitFor();
        await expectTargetAlignment(web, remote);
        await moveInside(desktop);
        await remote.and(web.locator(':not([data-cursor-target])')).waitFor();
        await showAndOpenSettings(web);

        await web.getByTestId('settings').hover();
        const desktopRemote = await assertBothHumans(desktop);
        assert.match(await desktopRemote.innerText(), /Browser/);
        await desktopRemote.and(desktop.locator('[data-cursor-target="settings"]')).waitFor();
        await expectTargetAlignment(desktop, desktopRemote);
        await moveInside(web);
        await desktopRemote.and(desktop.locator(':not([data-cursor-target])')).waitFor();
        await showAndOpenSettings(desktop);
        if (screenshotDirectory)
            await desktop.screenshot({ path: join(screenshotDirectory, 'electron.png') });

        await web.close();
        await waitForParticipants(desktop, 1);
        await desktopRemote.waitFor({ state: 'detached' });
        console.log(
            'Browser and Electron shared pointer positions across different widths and completed both German chat turns.',
        );
    } finally {
        await electronApp.close();
    }

    assert.deepEqual(errors, [], 'The demo must not throw uncaught renderer errors.');
    if (!live) {
        assert.deepEqual(
            providerErrors,
            [],
            'The AI SDK must send valid OpenAI-compatible requests.',
        );
        assert.deepEqual(observedPrompts, [
            unrelatedPrompt,
            showPrompt,
            openPrompt,
            showPrompt,
            openPrompt,
            showPrompt,
            openPrompt,
            showPrompt,
            openPrompt,
        ]);
    }
    console.log(
        live ? 'Used the configured live model endpoint.' : 'Used the HTTP completion fixture.',
    );
} catch (error) {
    if (errors.length) console.error('Renderer errors:', errors);
    if (providerErrors.length) console.error('Provider fixture errors:', providerErrors);
    throw error;
} finally {
    try {
        await browser?.close();
        await relay?.close();
    } finally {
        if (provider?.listening) {
            await new Promise((resolve, reject) =>
                provider.close((error) => (error ? reject(error) : resolve())),
            );
        }
    }
}
