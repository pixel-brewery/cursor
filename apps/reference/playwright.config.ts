import { defineConfig } from '@playwright/test';

const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const live =
    process.env.CURSOR_CHAT_BASE_URL !== undefined || process.env.CURSOR_LIVE_CHAT === '1';

export default defineConfig({
    testDir: './tests',
    tsconfig: './tsconfig.e2e.json',
    outputDir: './dist/test-results',
    forbidOnly: Boolean(process.env.CI),
    workers: 1,
    timeout: live ? 150_000 : 30_000,
    use: {
        viewport: { width: 1200, height: 800 },
        ...(chromiumExecutable
            ? { launchOptions: { executablePath: chromiumExecutable } }
            : {}),
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
});
