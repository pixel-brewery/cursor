import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { _electron as electron, chromium } from 'playwright';
import { startReferenceServer } from '../dist/node/server.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const screenshotDirectory = process.env.CURSOR_SCREENSHOT_DIR;
const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const portProbe = createServer();
await new Promise((resolve, reject) => portProbe.once('error', reject).listen(0, '127.0.0.1', resolve));
const { port } = portProbe.address();
await new Promise((resolve, reject) => portProbe.close((error) => error ? reject(error) : resolve()));

if (screenshotDirectory) await mkdir(screenshotDirectory, { recursive: true });
const relay = await startReferenceServer(port);
let browser;
const errors = [];

function observe(page) {
    page.on('pageerror', (error) => errors.push(error.message));
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

async function showAndOpenSettings(page) {
    const assistant = page.locator('[data-cursor-kind="assistant"][data-cursor-target="settings"][data-cursor-arrived]');
    const panel = page.getByTestId('settings-panel');
    await page.getByTestId('assistant-show').click();
    await assistant.waitFor();
    await expectTargetAlignment(page, assistant);
    assert.equal(await panel.isVisible(), false, 'Showing the control must leave its panel closed.');
    await assertBothHumans(page);

    await page.getByTestId('assistant-open').locator('button').press('Enter');
    await panel.waitFor();
    assert.equal(await panel.getAttribute('data-open-count'), '1');
    assert.equal(await page.getByTestId('settings').getAttribute('aria-expanded'), 'true');
}

try {
    browser = await chromium.launch(chromiumExecutable ? { executablePath: chromiumExecutable } : {});
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
    await showAndOpenSettings(first);
    if (screenshotDirectory) await first.screenshot({ path: join(screenshotDirectory, 'browser.png') });

    await second.mouse.move(1, 1);
    await first.locator('[data-cursor-kind="human"]:not([data-cursor-local])').waitFor({ state: 'detached' });
    await moveInside(second);
    await assertBothHumans(first);
    await second.close();
    await waitForParticipants(first, 1);
    await first.locator('[data-cursor-kind="human"]:not([data-cursor-local])').waitFor({ state: 'detached' });
    await first.close();
    console.log('Two browser views showed both humans and the assistant. Show, keyboard invoke, leave and departure passed.');

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
        if (screenshotDirectory) await desktop.screenshot({ path: join(screenshotDirectory, 'electron.png') });

        await web.close();
        await waitForParticipants(desktop, 1);
        await desktopRemote.waitFor({ state: 'detached' });
        console.log('Browser and Electron shared pointer positions across different widths. Both hosts showed and invoked Settings.');
    } finally {
        await electronApp.close();
    }

    assert.deepEqual(errors, [], 'The demo must not throw uncaught renderer errors.');
} catch (error) {
    if (errors.length) console.error('Renderer errors:', errors);
    throw error;
} finally {
    await browser?.close();
    await relay.close();
}
