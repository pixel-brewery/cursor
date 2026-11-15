import { strict as assert } from 'node:assert';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { compile } from 'svelte/compiler';
import { createServer } from 'vite';

const fixtureRoot = fileURLToPath(new URL('./', import.meta.url));
const server = await createServer({
    root: fixtureRoot,
    configFile: false,
    logLevel: 'error',
    server: {
        host: '127.0.0.1',
        port: 0,
        fs: { allow: [resolve(fixtureRoot, '../..')] }
    },
    optimizeDeps: {
        noDiscovery: true,
        include: ['react', 'react-dom/client', 'vue', 'svelte', 'svelte/internal/client', 'svelte/store']
    },
    plugins: [{
        name: 'cursor-svelte-test-fixture',
        transform(source, id) {
            if (!id.endsWith('.svelte')) return;
            const { js } = compile(source, { filename: id, generate: 'client' });
            return { code: js.code, map: js.map };
        }
    }]
});

const errors = [];
let browser;
try {
    await server.listen();
    const address = server.httpServer?.address();
    if (!address || typeof address === 'string') throw new Error('Cannot determine the fixture port.');
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE });
    for (const framework of ['angular', 'react', 'vue', 'svelte']) {
        const page = await browser.newPage({ reducedMotion: 'reduce' });
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error));
        try {
            await verifyFramework(page, `http://127.0.0.1:${address.port}/?framework=${framework}`);
            assert.deepEqual(pageErrors, []);
            console.log(`Verified ${framework} surface mounting, target replacement, controller reattachment and unmount.`);
        } catch (error) {
            errors.push(new Error(`${framework} adapter verification failed`, {
                cause: pageErrors.length ? new AggregateError([...pageErrors, error]) : error
            }));
        } finally {
            await page.close();
        }
    }
} finally {
    await browser?.close();
    await server.close();
}
if (errors.length) throw new AggregateError(errors, 'Framework adapter verification failed');

async function verifyFramework(page, url) {
    await page.goto(url);
    await page.getByTestId('surface').waitFor({ timeout: 10_000 });
    await waitUntilShown(page, 'initial', 'settings');

    await page.evaluate(() => window.cursorFixture.setTargetId('shortcuts'));
    await waitUntilShown(page, 'initial', 'shortcuts');
    assert.equal(await show(page, 'initial', 'settings'), 'unavailable');

    await page.evaluate(() => window.cursorFixture.replaceController());
    await waitUntilShown(page, 'replacement', 'shortcuts');
    assert.equal(await show(page, 'initial', 'shortcuts'), 'unavailable');

    await page.evaluate(() => window.cursorFixture.destroy());
    await page.getByTestId('surface').waitFor({ state: 'detached' });
    assert.equal(await show(page, 'replacement', 'shortcuts'), 'unavailable');
}

async function waitUntilShown(page, controller, target) {
    await page.waitForFunction(
        async ({ controller, target }) => (await window.cursorFixture?.show(controller, target)) === 'shown',
        { controller, target },
        { polling: 100, timeout: 5_000 }
    );
}

function show(page, controller, target) {
    return page.evaluate(({ controller, target }) => window.cursorFixture.show(controller, target), { controller, target });
}
