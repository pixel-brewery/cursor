# Cursor documentation

Cursor is Pixel Brewery’s TypeScript SDK for visible human and AI pointers in web and Electron applications. This workspace contains the runtime, framework adapters, reference demo and its implementation plan.

| Goal                                              | Read                                                   |
| ------------------------------------------------- | ------------------------------------------------------ |
| Understand the product and set up a checkout      | [Repository README](../README.md)                      |
| Understand the pointer and action workflow        | [Runtime implementation plan](plan.md)                 |
| Attach Cursor to a product or framework           | [Host integration](guides/integrate-cursor.md)         |
| Run the test projects and verify coverage         | [Testing guide](guides/testing.md)                     |
| Update package contracts and API documentation    | [API documentation guide](guides/api-documentation.md) |
| Connect the reference chat                        | [Reference chat](guides/reference-chat.md)             |
| Prepare a coding agent to work in this repository | [Repository instructions](../AGENTS.md)                |
| Inspect the shared MCP definition                 | [Mosaik catalog registry](../.vscode/mcp.json)         |

## Agent configuration

`AGENTS.md` governs repository work. The canonical skill definitions live under `.agents/skills/`, with the upstream Architect and Designer protected by `skills-lock.json`. The local architecture skill applies to every task. The local design skill adds the Mosaik catalog workflow for UI decisions. The shared registry in `.vscode/mcp.json` starts the pinned Mosaik catalog and runs the Nx CLI through Yarn. Claude Code gets its Nx integration from the Nx plugin in `.claude/settings.json`.

The imported Nx skills and agent configuration come from [Nx AI Agents Config](https://github.com/nrwl/nx-ai-agents-config) and retain its [MIT notice](../.agents/licenses/nx-ai-agents-config.txt).

| Client         | Repository entry point                                                   |
| -------------- | ------------------------------------------------------------------------ |
| Codex          | `AGENTS.md`, native skills, project configuration and roles in `.codex/` |
| Claude Code    | `CLAUDE.md`, project skills and roles under `.claude/`, `.mcp.json`      |
| OpenCode       | `opencode.json`, native skills and project roles under `.opencode/`      |
| GitHub Copilot | Repository instructions, custom roles and project MCP under `.github/`   |
| Cursor IDE     | Project rules and MCP under `.cursor/`                                   |
| Gemini CLI     | `GEMINI.md` and project MCP settings under `.gemini/`                    |
| VS Code        | The shared MCP registry and GitHub Copilot repository instructions       |

Edit the canonical guidance and registry, then run `yarn agents:sync`. Run `yarn agents:check` to verify that the client configuration matches the sources and `yarn agents:mcp-check` to start the local catalog and check its tools. Client settings retain authority over access, prompts and permissions. Supply any package registry credentials through the local environment.

## Runtime entry points

| Package                         | Start here                                                                        | Reference                                           |
| ------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------- |
| `@pixel-brewery/cursor-core`    | `createCursorController` connects a view to the host transport and authorization. | [Core API](packages/cursor-core/api/index.md)       |
| `@pixel-brewery/cursor-browser` | `attachCursorSurface` mounts the shared overlay and registers visible targets.    | [Browser API](packages/cursor-browser/api/index.md) |
| `@pixel-brewery/cursor-adapter-mosaik/components/*` | Generated accessors for individual Mosaik Web Components. | [Component adapter guide](mosaik-component-accessors.md), [Mosaik adapter API](packages/cursor-adapter-mosaik/api/index.md) |
| `@pixel-brewery/cursor-angular` | `CursorSurfaceDirective` and `CursorTargetDirective` bind Angular views.          | [Angular API](packages/cursor-angular/api/index.md) |
| `@pixel-brewery/cursor-react`   | `useCursorSurface` and `useCursorTarget` bind React components.                   | [React API](packages/cursor-react/api/index.md)     |
| `@pixel-brewery/cursor-vue`     | `useCursorSurface` and `useCursorTarget` bind Vue components.                     | [Vue API](packages/cursor-vue/api/index.md)         |
| `@pixel-brewery/cursor-svelte`  | `cursorSurface` and `cursorTarget` bind Svelte actions.                           | [Svelte API](packages/cursor-svelte/api/index.md)   |

The [reference view](../apps/reference/src/renderer/views/ReferenceView.tsx) shows how a Preact host binds cursor targets to mounted DOM elements and invokes registered actions. Browser and Electron use the same view and render Mosaik Web Components directly. Its [transport](../apps/reference/src/renderer/transport/connectReference.ts) implements the `ICursorTransport` boundary for the demo relay.

## Runtime verification

Run the unit and transport contract checks and verify generated API documentation.

```sh
yarn test
yarn docs:check
```

The [testing guide](guides/testing.md) lists the framework and demo Playwright commands, supported renderers, model fixture and live model setup.

To use the reference view interactively, [start the browser model](guides/reference-chat.md#start-the-browser-model) for `yarn demo:web` or [configure a local CLI connection](guides/reference-chat.md#configure-a-local-connection-in-electron) in `yarn demo:electron`. The browser entry point is [the loopback URL](http://127.0.0.1:4317/). Host applications supply their own authenticated transport and action authorization.

## Dependency automation

When every required check of a Dependabot pull request is green, [the auto-merge workflow](../.github/workflows/dependabot-merge.yml) squash-merges it; GitHub still enforces the `main` ruleset. A merge made with the workflow token starts no push workflows, so the same job then dispatches the matching push workflows, such as `ci.yml` and `publish-pages.yml`, with the merge commit as `expected_head_sha`.
