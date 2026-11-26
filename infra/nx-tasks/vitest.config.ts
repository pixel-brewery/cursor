// #region Imports
import { configDefaults, defineConfig } from 'vitest/config';
// #endregion

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude, '**/createDependabotAutomation.spec.mjs'],
    },
});
