# Cursor documentation

Cursor is Pixel Brewery’s TypeScript SDK for visible human and AI pointers in web and Electron applications. This workspace contains the tooling, branding and implementation plan for the runtime.

| Goal                                              | Read                                           |
| ------------------------------------------------- | ---------------------------------------------- |
| Understand the product and set up a checkout      | [Repository README](../README.md)              |
| Implement the first pointer and action workflow   | [Runtime implementation plan](plan.md)         |
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
