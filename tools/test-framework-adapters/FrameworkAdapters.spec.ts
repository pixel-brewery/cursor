// #region Imports

import { resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { compile } from 'svelte/compiler';
import { createServer, type ViteDevServer } from 'vite';

// #endregion

let server: ViteDevServer;
let origin: string;

test.beforeAll(async () => {
    const root = import.meta.dirname;
    server = await createServer({
        root,
        configFile: false,
        logLevel: 'error',
        server: { host: '127.0.0.1', port: 0, fs: { allow: [resolve(root, '../..')] } },
        optimizeDeps: {
            noDiscovery: true,
            include: [
                'react',
                'react-dom/client',
                'vue',
                'svelte',
                'svelte/internal/client',
                'svelte/store',
            ],
        },
        plugins: [
            {
                name: 'cursor-svelte-test-fixture',
                transform(source, id) {
                    if (!id.endsWith('.svelte')) return;
                    const { js } = compile(source, { filename: id, generate: 'client' });
                    return { code: js.code, map: js.map };
                },
            },
        ],
    });
    await server.listen();
    const address = server.httpServer?.address();
    if (!address || typeof address === 'string')
        throw new Error('Cannot determine the fixture port.');
    origin = `http://127.0.0.1:${address.port}`;
});

test.afterAll(async () => server?.close());

for (const framework of ['angular', 'react', 'vue', 'svelte']) {
    test.describe(framework, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`${origin}/?framework=${framework}`);
            await expect(page.getByTestId('surface')).toBeVisible();
            await expect.poll(() => show(page, 'initial', 'settings')).toBe('shown');
        });

        test('binds a registered accessor to the mounted target through the framework provider', async ({ page }) => {
            await expect(page.getByTestId('surface').getByRole('button'))
                .toHaveAttribute('data-cursor-accessor', 'button');
        });

        test('releases registrations after target replacement, controller replacement and unmount', async ({
            page,
        }) => {
            await page.evaluate(() => window.cursorFixture.setTargetId('shortcuts'));
            await expect.poll(() => show(page, 'initial', 'shortcuts')).toBe('shown');
            expect(await show(page, 'initial', 'settings')).toBe('unavailable');

            await page.evaluate(() => window.cursorFixture.replaceController());
            await expect.poll(() => show(page, 'replacement', 'shortcuts')).toBe('shown');
            expect(await show(page, 'initial', 'shortcuts')).toBe('unavailable');

            await page.evaluate(() => window.cursorFixture.destroy());
            await expect(page.getByTestId('surface')).toHaveCount(0);
            expect(await show(page, 'replacement', 'shortcuts')).toBe('unavailable');
            await expect(page.locator('[data-cursor-overlay]')).toHaveCount(0);
            expect(await page.pageErrors()).toEqual([]);
        });

        test('updates the remote projection policy and keeps registered target anchors', async ({
            page,
        }) => {
            const remote = page.locator('[data-cursor-id="remote"]');
            await page.evaluate(() => window.cursorFixture.receivePointer());
            await expect(remote).toBeVisible();

            await page.evaluate(() => window.cursorFixture.setSurfaceProjection(false));
            await expect(remote).toHaveCount(0);

            await page.evaluate(() => window.cursorFixture.receivePointer('settings'));
            await expect(remote).toHaveAttribute('data-cursor-target', 'settings');

            await page.evaluate(() => window.cursorFixture.receivePointer());
            await expect(remote).toHaveCount(0);

            await page.evaluate(() => window.cursorFixture.setSurfaceProjection(true));
            await expect(remote).toBeVisible();
            expect(await page.pageErrors()).toEqual([]);
        });
    });
}

function show(page: Page, controller: 'initial' | 'replacement', targetId: string) {
    return page.evaluate(
        ({ controller, targetId }) => window.cursorFixture.show(controller, targetId),
        { controller, targetId },
    );
}
