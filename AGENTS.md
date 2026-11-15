# Pixel Brewery Cursor agent guide

Pixel Brewery Cursor is a TypeScript workspace for rendering participant and assistant pointers and dispatching host-registered guided actions. [The implementation plan](.docs/plan.md) describes the planned runtime.

## Required skills

- Before every repository task, read and apply [Cursor Architect](.agents/skills/cursor-architect/SKILL.md), its pinned [Pixel Brewery Architect base](.agents/skills/architect/SKILL.md) and the applicable reference modules.
- Before proposing, implementing or reviewing a UI or interaction decision, apply [Cursor Designer](.agents/skills/cursor-designer/SKILL.md). It loads the pinned [Pixel Brewery Designer base](.agents/skills/designer/SKILL.md) and the shared Mosaik catalog workflow. Record the catalog and runtime evidence required by that workflow.
- Keep project-specific rules in the derived skills. Keep the installed upstream skills intact. Update them via Skills CLI at an explicitly reviewed full commit and retain its generated content hashes.

## Agent configuration

- Maintain shared instructions here, canonical roles in the agent configuration, and tool declarations in [.vscode/mcp.json](.vscode/mcp.json). Run `yarn agents:sync` after edits to these sources or the skills.
- Read skill references from their canonical directories. Verify projections with `yarn agents:check` and verify the installed Mosaik tools with `yarn agents:mcp-check`.
- Keep secrets in the calling environment. Project adapters inherit the client's permission, approval and sandbox policy.

## Workspace and delivery

- Work in the designated primary checkout. Obtain the owner's explicit approval for any additional worktree. Keep parallel edits disjoint and assign one owner for staging, commits and refs.
- Follow the installed toolchain and package boundaries. Each package publishes a narrow public API. Tests cover observable behavior, authority, lifecycle and scope boundaries.
- Organize reusable libraries under `libs/`, reference applications under `apps/`, and authored architecture and guides under `.docs/`.
- Run the local Ship-it review when available before opening any pull request. Respect the actual GitHub rules and owner instructions for commits, pushes, releases and publication.


<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax


<!-- nx configuration end-->
