import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ChatMessageElement } from '@pixel-brewery/mosaik-elements-foundation';
import { _electron as electron, type Locator, type Page, type WebSocketRoute } from 'playwright';
import {
    cycleStylePrompt,
    expect,
    live,
    openPrompt,
    replies,
    showPrompt,
    squareStylePrompt,
    test,
    unrelatedPrompt,
} from './reference.fixture.js';
import { createNativeCliFixture } from './nativeCli.fixture.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const localHuman = '[data-cursor-kind="human"][data-cursor-local]';
const remoteHuman = '[data-cursor-kind="human"]:not([data-cursor-local])';
const assistant = '[data-cursor-kind="assistant"]';
const arrived = `${assistant}[data-cursor-target="settings"][data-cursor-arrived]`;
const styleArrival = `${assistant}[data-cursor-target="cursor-style"][data-cursor-arrived]`;
const arrivedAtStyle = `${styleArrival}:not([data-cursor-guided-element])`;

function observe(page: Page, errors: string[]): void {
    page.on('pageerror', (error) => errors.push(error.stack ?? error.message));
}

async function expectParticipants(page: Page, number: number): Promise<void> {
    await expect(page.getByTestId('connection-status')).toHaveAttribute(
        'data-connected',
        String(number),
    );
}

async function moveInside(page: Page, horizontalPosition = 0.5): Promise<void> {
    const pointerArea = page.getByTestId('pointer-area');
    await pointerArea.scrollIntoViewIfNeeded();
    const area = await pointerArea.boundingBox();
    assert(area);
    await page.mouse.move(area.x + area.width * horizontalPosition, area.y + area.height / 2);
}

async function expectTargetAlignment(
    page: Page,
    pointer: Locator,
    targetId: 'settings' | 'cursor-style' = 'settings',
): Promise<void> {
    const target = page.getByTestId(targetId);
    await expect(pointer).toBeVisible();
    await expect(target).toBeInViewport({ ratio: 0.99 });
    await expect
        .poll(
            async () => {
                const targetBox = await target.boundingBox();
                const pointerBox = await pointer.boundingBox();
                if (!targetBox || !pointerBox) return Infinity;
                return Math.hypot(
                    pointerBox.x - targetBox.x - targetBox.width / 2,
                    pointerBox.y - targetBox.y - targetBox.height / 2,
                );
            },
            { message: `The pointer tip is at the receiver’s ${targetId} control` },
        )
        .toBeLessThan(5);
}

async function expectBothHumans(page: Page): Promise<Locator> {
    const local = page.locator(localHuman);
    const remote = page.locator(remoteHuman);
    await expect(local).toBeVisible();
    await expect(remote).toBeVisible();
    expect(await local.innerText()).not.toBe(await remote.innerText());
    return remote;
}

function chatInput(page: Page): Locator {
    return page.getByTestId('assistant-input').locator('textarea');
}

async function sendChat(page: Page, prompt: string, keyboard = false): Promise<void> {
    const input = chatInput(page);
    await input.fill(prompt);
    if (keyboard) await input.press('Enter');
    else await page.getByTestId('assistant-send').locator('button').click();
}

async function expectReply(page: Page, index: number, prompt: string): Promise<void> {
    const reply = page.getByTestId('assistant-chat').getByTestId('assistant-reply').nth(index);
    await expect(reply).toBeVisible(live ? { timeout: 35_000 } : {});
    const text = await reply.evaluate((element) => (element as ChatMessageElement).text.trim());
    expect(text).not.toBe('');
    expect(text).not.toBe(prompt);
    const fixtureReply = replies.get(prompt);
    if (!live && fixtureReply) expect(text).toBe(fixtureReply.text);
}

async function showSettings(page: Page): Promise<void> {
    await sendChat(page, showPrompt);
    await expectReply(page, 0, showPrompt);
    await expectTargetAlignment(page, page.locator(arrived));
    await expect(page.getByTestId('settings-panel')).toBeHidden();
    await expect(page.getByTestId('assistant-status')).toHaveJSProperty(
        'header',
        'Der KI-Cursor zeigt auf die Einstellungen.',
    );
}

async function expectSettingsOpenedOnce(page: Page): Promise<void> {
    await expectReply(page, 1, openPrompt);
    const panel = page.getByTestId('settings-panel');
    await expect(panel).toBeVisible();
    await expect(panel).toHaveAttribute('data-open-count', '1');
    await expect(page.getByTestId('settings')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByTestId('assistant-status')).toHaveJSProperty(
        'header',
        'Die Einstellungen sind geöffnet.',
    );
}

async function showAndOpenSettings(page: Page): Promise<void> {
    await showSettings(page);
    await moveInside(page);
    await expectBothHumans(page);
    await sendChat(page, openPrompt, true);
    await expectSettingsOpenedOnce(page);
}

async function changeStyleFromChat(
    page: Page,
    index: number,
    prompt: string,
    style: 'square' | 'square-outline',
): Promise<void> {
    const select = page.getByTestId('cursor-style');
    await expect(select).toHaveJSProperty('isDropDownOpen', false);
    const option = page.getByTestId(`cursor-style-${style}`);
    const activation = await option.evaluateHandle((item, guidedPointerSelector) => {
        const selectElement = item.closest('mosaik-select');
        if (!selectElement) throw new Error('The style option is missing its select');
        const observed = {
            menuVisibleInFrame: false,
            menuVisibleAtClick: false,
            valueBeforeClick: selectElement.value,
            tipDistanceAtClick: Infinity,
        };
        const menuVisible = () => selectElement.isDropDownOpen &&
            !!selectElement.shadowRoot?.querySelector(':popover-open') &&
            item.checkVisibility({ visibilityProperty: true });
        let frame = requestAnimationFrame(function observeMenu() {
            observed.menuVisibleInFrame = menuVisible();
            if (!observed.menuVisibleInFrame) frame = requestAnimationFrame(observeMenu);
        });
        // Record the visible pointer before the select handles the click and closes the menu.
        item.addEventListener('click', () => {
            cancelAnimationFrame(frame);
            observed.menuVisibleAtClick = menuVisible();
            observed.valueBeforeClick = selectElement.value;
            const pointer = document.querySelector(guidedPointerSelector);
            if (!pointer?.checkVisibility() || !pointer.closest(':popover-open')) return;
            const optionBox = item.getBoundingClientRect();
            const pointerBox = pointer.getBoundingClientRect();
            observed.tipDistanceAtClick = Math.hypot(
                pointerBox.x - optionBox.x - optionBox.width / 2,
                pointerBox.y - optionBox.y - optionBox.height / 2,
            );
        }, { capture: true, once: true });
        return observed;
    }, `${styleArrival}[data-cursor-guided-element]`);

    await sendChat(page, prompt);
    await expectReply(page, index, prompt);
    await expect(page.getByTestId('settings-panel')).toBeVisible();
    await expect(page.getByTestId('settings-panel')).toHaveAttribute('data-open-count', '1');
    await expect(page.getByTestId('surface')).toHaveAttribute('data-cursor-style', style);
    await expect(select).toHaveJSProperty('value', style);
    await expect(select).toHaveJSProperty('isDropDownOpen', false);
    await expect(option).toBeHidden();
    const observed = await activation.jsonValue();
    await activation.dispose();
    expect(observed.menuVisibleInFrame).toBe(true);
    expect(observed.menuVisibleAtClick).toBe(true);
    expect(observed.valueBeforeClick).not.toBe(style);
    expect(observed.tipDistanceAtClick).toBeLessThan(5);
    const pointer = page.locator(arrivedAtStyle);
    await expect(pointer).toHaveAttribute('data-cursor-style', style);
    await expectTargetAlignment(page, pointer, 'cursor-style');
    await expect(page.getByTestId('assistant-status')).toHaveJSProperty(
        'header',
        'Der Zeigerstil ist eingestellt.',
    );
}

async function takeScreenshot(page: Page, filename: string, fullPage = false): Promise<void> {
    const directory = process.env.CURSOR_SCREENSHOT_DIR;
    if (!directory) return;
    await mkdir(directory, { recursive: true });
    await page.screenshot({ path: join(directory, filename), animations: 'disabled', fullPage });
}

test('two browser views act on their own chat while keeping both human pointers', async ({
    page: first,
    browser,
    reference,
}) => {
    const second = await browser.newPage({ viewport: { width: 900, height: 740 } });
    const errors: string[] = [];
    observe(first, errors);
    observe(second, errors);

    await test.step('Display both humans in both browser views', async () => {
        await Promise.all([first.goto(reference.origin), second.goto(reference.origin)]);
        await Promise.all([expectParticipants(first, 2), expectParticipants(second, 2)]);
        await takeScreenshot(first, 'browser-start.png');
        await moveInside(first);
        await expect(first.getByTestId('pointer-area')).toHaveCSS('cursor', 'none');
        await moveInside(second);
        await expectBothHumans(first);
        await expectBothHumans(second);
    });

    await test.step('Show and open Settings independently in each view from German chat', async () => {
        const preset = first.getByTestId('assistant-suggest-show').locator('button');
        await expect(preset).toBeEnabled();
        await preset.press('Enter');
        await expect(chatInput(first)).toHaveValue(showPrompt);
        await expect(chatInput(first)).toBeFocused();
        await first.getByTestId('assistant-suggest-style').locator('button').press('Enter');
        await expect(chatInput(first)).toHaveValue(showPrompt);
        await expect(first.getByTestId('assistant-user-message')).toHaveCount(0);
        await showAndOpenSettings(first);
        await expect(second.getByTestId('settings-panel')).toBeHidden();
        await expect(second.locator(assistant)).toHaveCount(0);
        await showAndOpenSettings(second);
        if (reference.completions) {
            expect(reference.completions.prompts).toEqual([
                showPrompt,
                openPrompt,
                showPrompt,
                openPrompt,
            ]);
        }
        await takeScreenshot(first, 'browser.png');
    });

    await test.step('Reproject the settled assistant when its target moves and leaves the viewport', async () => {
        const target = first.getByTestId('settings');
        const original = await target.boundingBox();
        assert(original);
        await first.setViewportSize({ width: 530, height: 440 });
        await first.evaluate(() => window.scrollTo(0, 0));
        const resized = await target.boundingBox();
        assert(resized);
        expect(Math.abs(original.x - resized.x)).toBeGreaterThan(20);
        await expectTargetAlignment(first, first.locator(arrived));
        await takeScreenshot(first, 'browser-narrow.png', true);

        await first.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(target).not.toBeInViewport();
        await expect(first.locator(assistant)).toHaveCount(0);
        await first.evaluate(() => window.scrollTo(0, 0));
        await expectTargetAlignment(first, first.locator(arrived));
        await first.setViewportSize({ width: 1200, height: 800 });
    });

    await test.step('Remove a remote pointer on leave and again when that browser closes', async () => {
        await second.mouse.move(1, 1);
        await expect(second.getByTestId('pointer-area')).not.toHaveCSS('cursor', 'none');
        await expect(first.locator(remoteHuman)).toHaveCount(0);
        await moveInside(first);
        await moveInside(second);
        await expectBothHumans(first);
        await second.close();
        await expectParticipants(first, 1);
        await expect(first.locator(remoteHuman)).toHaveCount(0);
    });
    expect(errors).toEqual([]);
});

test('Electron and a reduced-motion browser share target positions and each acts from chat', async ({
    browser,
    reference,
}) => {
    const fixture = await createNativeCliFixture();
    let desktopApp: Awaited<ReturnType<typeof electron.launch>> | undefined;
    const errors: string[] = [];
    try {
        desktopApp = await electron.launch({
            args: [root, `--user-data-dir=${fixture.dataDirectory}`],
            env: { ...fixture.env, CURSOR_REFERENCE_PORT: String(reference.port) },
            timeout: 30_000,
        });
        const desktop = await desktopApp.firstWindow();
        const web = await browser.newPage({
            viewport: { width: 580, height: 690 },
            reducedMotion: 'reduce',
        });
        observe(desktop, errors);
        observe(web, errors);
        await web.goto(reference.origin);
        await Promise.all([expectParticipants(web, 2), expectParticipants(desktop, 2)]);
        await expect(web.getByTestId('config-open')).toBeHidden();
        await expect(chatInput(desktop)).toBeDisabled();
        const provider = desktop.getByTestId('config-provider').locator('button');
        const openCodeProvider = desktop.getByTestId('config-opencode-provider');
        await provider.click();
        await desktop.getByTestId('config-provider-opencode').click();
        await expect(openCodeProvider).toBeVisible();
        await provider.click();
        await desktop.getByTestId('config-provider-codex').click();
        await expect(openCodeProvider).toBeHidden();
        await desktop.getByTestId('config-save').locator('button').click();
        await expect(desktop.getByTestId('config-status')).toHaveAttribute(
            'data-status',
            'signed-out',
        );
        await expect(chatInput(desktop)).toBeDisabled();
        await desktop.getByTestId('config-login-method').locator('button').click();
        await desktop.getByTestId('config-login-method-chatgpt-browser').click();
        await desktop.getByTestId('config-login').locator('button').click();
        await expect(desktop.getByTestId('config-login-open')).toBeVisible();
        await takeScreenshot(desktop, 'electron-connection.png');
        await fixture.completeLogin();
        await expect(desktop.getByTestId('config-status')).toHaveAttribute('data-status', 'ready');
        await expect(chatInput(desktop)).toBeEnabled();
        await desktop.getByTestId('config-open').locator('button').click();
        await expect(desktop.getByTestId('config-panel')).toBeHidden();

        await test.step('Project the Electron pointer to the browser control', async () => {
            await moveInside(web);
            await desktop.getByTestId('settings').hover();
            const remote = await expectBothHumans(web);
            await expect(remote).toHaveText(/Electron/);
            await expect(remote).toHaveAttribute('data-cursor-target', 'settings');
            await expectTargetAlignment(web, remote);
            await moveInside(desktop);
            await expect(remote).not.toHaveAttribute('data-cursor-target', 'settings');
            await showAndOpenSettings(web);
        });

        await test.step('Project the browser pointer to the Electron control', async () => {
            await web.getByTestId('settings').hover();
            await moveInside(desktop, 0.35);
            const remote = await expectBothHumans(desktop);
            await expect(remote).toHaveText(/Browser/);
            await expect(remote).toHaveAttribute('data-cursor-target', 'settings');
            await expectTargetAlignment(desktop, remote);
            await moveInside(web);
            await expect(remote).not.toHaveAttribute('data-cursor-target', 'settings');
            await showAndOpenSettings(desktop);
            await takeScreenshot(desktop, 'electron.png');
            await changeStyleFromChat(desktop, 2, squareStylePrompt, 'square');
            await expect(remote).toHaveAttribute('data-cursor-style', 'square');
            await changeStyleFromChat(desktop, 3, cycleStylePrompt, 'square-outline');
            await expect(remote).toHaveAttribute('data-cursor-style', 'square-outline');

            await web.close();
            await expectParticipants(desktop, 1);
            await expect(remote).toHaveCount(0);
        });
        if (reference.completions)
            expect(reference.completions.prompts).toEqual([showPrompt, openPrompt]);
        expect(errors).toEqual([]);
    } finally {
        try {
            await desktopApp?.close();
        } finally {
            await fixture.close();
        }
    }
});

test('a regular chat reply leaves the UI actions untouched', async ({ page, reference }) => {
    test.skip(live, 'The fixture deterministically selects the no-action reply.');
    await page.goto(reference.origin);
    await expectParticipants(page, 1);
    await sendChat(page, unrelatedPrompt);
    await expectReply(page, 0, unrelatedPrompt);
    await expect(page.getByTestId('assistant-status')).toBeHidden();
    await expect(page.locator(assistant)).toHaveCount(0);
    await expect(page.getByTestId('settings-panel')).toBeHidden();
    expect(reference.completions?.prompts).toEqual([unrelatedPrompt]);
});

test('cancelling an in-flight chat request aborts the model connection and keeps the draft available', async ({
    page,
    reference,
}) => {
    test.skip(live, 'A held HTTP completion makes cancellation deterministic.');
    assert(reference.completions);
    const pending = reference.completions.holdNext(openPrompt);
    let disconnected = false;
    void pending.disconnected.then(() => {
        disconnected = true;
    });

    await page.goto(reference.origin);
    await expectParticipants(page, 1);
    await showSettings(page);
    await sendChat(page, openPrompt, true);
    await expect.poll(() => reference.completions?.prompts).toEqual([showPrompt, openPrompt]);
    await pending.started;
    await page.getByTestId('assistant-input').locator('[part="stop"]').locator('button').click();

    await expect.poll(() => disconnected).toBe(true);
    await expect(page.getByTestId('assistant-status')).toHaveJSProperty(
        'header',
        'Anfrage abgebrochen.',
    );
    await expect(page.getByTestId('assistant-reply')).toHaveCount(1);
    await expect(page.getByTestId('settings-panel')).toBeHidden();
    await expect(chatInput(page)).toHaveValue(openPrompt);

    await chatInput(page).press('Enter');
    await expectSettingsOpenedOnce(page);
    expect(reference.completions.prompts).toEqual([showPrompt, openPrompt, openPrompt]);
});

test('a disconnected browser clears stale pointers and can use chat after rejoining the real relay', async ({
    page,
    browser,
    reference,
}) => {
    test.skip(live, 'The two main journeys exercise the live model.');
    const peer = await browser.newPage({ viewport: { width: 900, height: 740 } });
    const resume = Promise.withResolvers<void>();
    const socket: { current?: WebSocketRoute } = {};
    let reconnect: Promise<void> | undefined;
    await page.routeWebSocket(/\/cursor\?host=browser$/, async (browserSocket) => {
        await reconnect;
        socket.current = browserSocket.connectToServer();
    });
    try {
        await Promise.all([page.goto(reference.origin), peer.goto(reference.origin)]);
        await Promise.all([expectParticipants(page, 2), expectParticipants(peer, 2)]);
        await showSettings(page);
        await moveInside(page);
        await moveInside(peer);
        const before = await expectBothHumans(peer);
        const previousId = await before.getAttribute('data-cursor-id');
        expect(previousId).toBeTruthy();

        const active = socket.current;
        assert(active);
        reconnect = resume.promise;
        await active.close({ code: 4001 });
        await expectParticipants(peer, 1);
        await expect(page.getByTestId('connection-status')).not.toHaveAttribute('data-connected');
        await expect(page.locator(assistant)).toHaveCount(0);
        await expect(page.getByTestId('pointer-area')).not.toHaveCSS('cursor', 'none');
        await expect(page.getByTestId('assistant-input')).toHaveAttribute('disabled', '');
        await expect(peer.locator(remoteHuman)).toHaveCount(0);

        resume.resolve();
        await Promise.all([expectParticipants(page, 2), expectParticipants(peer, 2)]);
        await moveInside(page);
        await moveInside(peer);
        const rejoined = await expectBothHumans(peer);
        await expect(rejoined).not.toHaveAttribute('data-cursor-id', previousId ?? '');
        await expect(page.locator(assistant)).toHaveCount(0);
        await expect(page.getByTestId('settings-panel')).toBeHidden();

        await sendChat(page, openPrompt, true);
        await expectSettingsOpenedOnce(page);
        expect(reference.completions?.prompts).toEqual([showPrompt, openPrompt]);
    } finally {
        resume.resolve();
        await peer.close();
    }
});

test('chat and the preset selector restyle pointers locally without losing assistant guidance', async ({
    page,
    browser,
    reference,
}) => {
    const peer = await browser.newPage({ viewport: { width: 900, height: 740 } });
    try {
        await Promise.all([page.goto(reference.origin), peer.goto(reference.origin)]);
        await Promise.all([expectParticipants(page, 2), expectParticipants(peer, 2)]);
        await moveInside(peer);

        const remote = page.locator(remoteHuman);
        const label = remote.locator('.cursor-pointer-label');
        const tip = remote.locator('.cursor-pointer-tip');
        const settled = page.locator(arrivedAtStyle);
        const togglePreset = page
            .getByTestId('cursor-style')
            .locator('[part="caret"]')
            .locator('button');
        await expect(remote).toHaveAttribute('data-cursor-style', 'pill');
        const remoteId = await remote.getAttribute('data-cursor-id');
        assert(remoteId);
        const tipAppearances = new Set<string>();

        await test.step('Open the picker, apply a named style and cycle from chat', async () => {
            await expect(page.getByTestId('settings-panel')).toBeHidden();
            await changeStyleFromChat(page, 0, squareStylePrompt, 'square');
            await expect(remote).toHaveAttribute('data-cursor-style', 'square');
            await changeStyleFromChat(page, 1, cycleStylePrompt, 'square-outline');
            await expect(remote).toHaveAttribute('data-cursor-style', 'square-outline');
            await expect(peer.getByTestId('surface')).toHaveAttribute('data-cursor-style', 'pill');
            await expect(peer.getByTestId('settings-panel')).toBeHidden();
            if (reference.completions) {
                expect(reference.completions.prompts).toEqual([squareStylePrompt]);
            }
        });

        for (const style of ['outline', 'square', 'square-outline', 'pill'] as const) {
            await test.step(`Select the ${style} preset in this view`, async () => {
                await togglePreset.click();
                await page.getByTestId(`cursor-style-${style}`).click();
                await expect(remote).toHaveAttribute('data-cursor-style', style);
                await expect(remote).toHaveAttribute('data-cursor-id', remoteId);
                await expect(settled).toHaveAttribute('data-cursor-style', style);
                await expectTargetAlignment(page, settled, 'cursor-style');

                const shape = await label.evaluate((element) => {
                    const { borderTopRightRadius, borderTopWidth } = getComputedStyle(element);
                    return {
                        rounded: Number.parseFloat(borderTopRightRadius) > 0,
                        outlined: Number.parseFloat(borderTopWidth) > 0,
                    };
                });
                expect(shape).toEqual({
                    rounded: !style.startsWith('square'),
                    outlined: style === 'outline',
                });

                const silhouette = await tip.evaluate((element) =>
                    [element, ...element.querySelectorAll('*')].map((part) => {
                        const { clipPath, backgroundColor, filter } = getComputedStyle(part);
                        return [clipPath, backgroundColor, filter];
                    }),
                );
                tipAppearances.add(JSON.stringify(silhouette));
                await moveInside(page, 0.35);
                await expect(peer.locator(remoteHuman)).toHaveAttribute(
                    'data-cursor-style',
                    'pill',
                );
                await takeScreenshot(page, `cursor-style-${style}.png`);
            });
        }

        expect(tipAppearances.size).toBe(4);
        await expect(page.getByTestId('settings-panel')).toHaveAttribute('data-open-count', '1');
    } finally {
        await peer.close();
    }
});
