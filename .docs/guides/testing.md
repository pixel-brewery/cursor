# Test and verify Cursor

Write unit and integration cases with Vitest. A TypeScript `.spec.ts` sits next to its production owner. The production TypeScript build excludes these files. Each test target type-checks the specs before execution. Use Playwright TypeScript specs for browser and Electron behavior.

| Command                             | Behavior covered                                                                                                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn test`                         | Core wire validation, ordering, lifecycle and command authorization. Browser geometry. Reference chat and pointer relay HTTP and socket contracts. API reference generation, stale output detection and validation.                   |
| `yarn test:adapters`                | Chromium mounts Angular, React, Vue and Svelte against their real renderer. It verifies target and controller replacement, unmount, and runtime projection changes with and without registered anchors.                               |
| `yarn test:demo`                    | Browser and Electron journeys exercise shared pointers, keyboard chat, guidance, scroll and resize, cancellation and reconnect. The browser uses an HTTP completion fixture. Electron runs Synapse against an executable CLI fixture. |
| `CURSOR_LIVE_CHAT=1 yarn test:demo` | Browser chat turns exercise the configured model. Electron uses the isolated CLI fixture. Start the model as described in the [reference chat guide](reference-chat.md).                                                              |
| `yarn docs:check`                   | The Nx generator verifies TypeDoc output against the committed documentation.                                                                                                                                                         |

Install local renderers with the workspace’s Playwright CLI and Electron setup script.

```sh
yarn exec playwright install chromium
yarn workspace @pixel-brewery/cursor-reference electron:install
yarn test:adapters
yarn test:demo
```

On Linux, use `xvfb-run -a yarn test:demo` when a display server is unavailable. Playwright opens temporary reference relays and fixtures on loopback ports. A provider selected for live testing uses its configured port. Browser tests can select an installed Chromium build through `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Set `CURSOR_SCREENSHOT_DIR` to save reference captures.

To run one Vitest owner through Nx, use `yarn nx run cursor-core:test`, `yarn nx run @pixel-brewery/cursor-browser:test`, `yarn nx run cursor-reference:test` or `yarn nx run api-docs:test`.
