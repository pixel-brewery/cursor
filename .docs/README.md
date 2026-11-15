# Cursor documentation

Cursor is Pixel Brewery’s TypeScript SDK for visible human and AI pointers in web and Electron applications. This workspace contains the runtime, framework adapters, reference demo and its implementation plan.

| Goal                                              | Read                                           |
| ------------------------------------------------- | ---------------------------------------------- |
| Understand the product and set up a checkout      | [Repository README](../README.md)              |
| Understand the pointer and action workflow       | [Runtime implementation plan](plan.md)         |
| Prepare a coding agent to work in this repository | [Repository instructions](../AGENTS.md)        |
| Inspect the shared MCP definition                 | [Mosaik catalog registry](../.vscode/mcp.json) |

## Agent configuration

`AGENTS.md` governs repository work. The canonical skill definitions live under `.agents/skills/`, with the upstream Architect and Designer protected by `skills-lock.json`. The local architecture skill applies to every task. The local design skill adds the Mosaik catalog workflow for UI decisions. The shared registry in `.vscode/mcp.json` starts the pinned catalog through `yarn exec mosaik-mcp`.

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

| Package | Start here |
| ------- | ---------- |
| `@pixel-brewery/cursor-core` | `createCursorController` connects a view to the host transport and authorization. |
| `@pixel-brewery/cursor-browser` | `attachCursorSurface` mounts the shared overlay and registers visible targets. |
| `@pixel-brewery/cursor-angular` | `CursorSurfaceDirective` and `CursorTargetDirective` bind Angular views. |
| `@pixel-brewery/cursor-react` | `useCursorSurface` and `useCursorTarget` bind React components. |
| `@pixel-brewery/cursor-vue` | `useCursorSurface` and `useCursorTarget` bind Vue components. |
| `@pixel-brewery/cursor-svelte` | `cursorSurface` and `cursorTarget` bind Svelte actions. |

The [reference renderer](../apps/reference/src/renderer/main.ts) shows how the host registers a target and invokes its action. Its [transport](../apps/reference/src/renderer/transport.ts) implements the `ICursorTransport` boundary for the demo relay.

## Runtime verification

Run the workspace build and the focused core checks before opening the reference views.

```sh
yarn build
yarn test
yarn exec playwright install chromium
yarn workspace @pixel-brewery/cursor-reference electron:install
yarn test:adapters
yarn test:demo
```

The adapter check mounts real Angular, React, Vue and Svelte fixtures. The demo check starts a temporary loopback relay, opens two browser views, then shares it between a browser view and Electron. On Linux, run the demo check under `xvfb-run -a` when there is no display server.

To use the reference view interactively, run `yarn demo:web` or `yarn demo:electron` and open [the loopback URL](http://127.0.0.1:4317/). The reference relay is for local verification. Host applications supply their own authenticated transport and action authorization.
