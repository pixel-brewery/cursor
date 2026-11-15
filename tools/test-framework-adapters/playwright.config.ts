// #region Imports

import { defineConfig } from '@playwright/test';

// #endregion

export default defineConfig({
    testDir: '.',
    testMatch: 'FrameworkAdapters.spec.ts',
    outputDir: '../../.nx/playwright/framework-adapters',
    workers: 1,
    use: {
        reducedMotion: 'reduce',
        ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
            ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } }
            : {}),
    },
});
