# Cursor project contract

- Use the primary checkout and the fixed toolchain declared in the workspace manifest. Synapse is the reference for explicit package composition, reproducible verification and maintainable documentation.
- Follow Mosaik's Nx task layout under `infra/nx-tasks`. Register each executor in `executors.json` and keep its schema, typed options and implementation together under `src/executors/<capability>`.
- Keep the TypeScript core independent of browser globals, UI frameworks, Electron APIs and AI providers. The browser renderer owns DOM life cycles, projection and live geometry. Framework adapters compose that same renderer. The Electron app uses it in its renderer.
- The host owns participant identity, view membership, realtime delivery, AI credentials and authorization for commands. A remote pointer update changes display state only. A guided action resolves one current registered target and calls the host's explicit action handler.
- Preserve public behavior across entry points. Verify removal of stale pointers, active view changes, disposal, target replacement and races around action execution. Run browser and Electron verification when those consumers are implemented.
- Authored contracts live under `.docs/`. Follow the [implementation plan](../../../../.docs/plan.md) and record substantive changes there.
- Use Synapse’s per-package `src/index.ts` and `tsconfig.lib.json` layout. Group contracts, models and implementation by responsibility. Keep package entry points explicit and follow Archipel’s region order in classes.
- Follow the [API documentation guide](../../../../.docs/guides/api-documentation.md) for English TSDoc, regions and generated references. Run `yarn docs` when an SDK declaration or TSDoc changes and verify it with `yarn docs:check`.
- Keep unit and integration tests in colocated TypeScript `.spec.ts` files with Vitest. Use TypeScript Playwright specs for browser and Electron behavior. Follow the [testing guide](../../../../.docs/guides/testing.md) and update it when runner or test ownership changes.
