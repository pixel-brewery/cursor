# TypeScript and API documentation

Each SDK library exposes its public declarations through `src/index.ts`. Keep one public declaration per source file. Place interfaces, models and runtime owners in the corresponding package directories. Keep framework-specific binding code in its adapter. The solution `tsconfig.json` references `tsconfig.lib.json`, which TypeDoc uses to resolve the same sources and dependency declarations as the build.

Group imports in `#region Imports`. In classes, order populated regions as `Fields`, `Ctor`, `Properties` and `Methods`. Declare member visibility explicitly. Within a region, order members by visibility and put static members ahead of instance members at the same visibility. Factory functions retain their lexical state and document their public contract.

Write English TSDoc for exported declarations and public or protected members. Describe required input, defaults, results, meaningful errors, and who owns cancellation and cleanup. Use `@param`, `@typeParam`, `@returns`, `@throws` and `@example` when they clarify the contract. Keep implementation-only declarations out of the package barrel.

## Generate and verify the reference

```sh
yarn docs
yarn docs:check
```

The Nx executor builds the SDK libraries, discovers their package exports and generates Markdown and JSON from TypeDoc 0.28.20 and typedoc-plugin-markdown 4.14.1. Conversion checks that the reflected declarations match TypeScript's exports. It validates documentation and verifies that each indexed destination exists.

- Package Markdown lives under `.docs/packages/<package>/api/`. Start from the [package reference links](../README.md#runtime-entry-points).
- [The API index](../api/api-index.json) lists packages, import paths, exports and their destinations. Links and reflection paths are relative to `.docs/`.
- The TypeDoc reflection for each package lives under `.docs/api/<package>/reflection.json`.

Edit the TypeScript source and regenerate the reference. The generator replaces its owned API directories after validation. `yarn docs:check` regenerates in a temporary directory and compares the result with the checkout. CI runs that check for source and documentation changes.
