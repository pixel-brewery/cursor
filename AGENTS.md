# Pixel Brewery Cursor agent guide

Pixel Brewery Cursor is a private TypeScript workspace for rendering participant and assistant pointers and dispatching host-registered guided actions. [The implementation plan](.docs/plan.md) describes the planned runtime.

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
