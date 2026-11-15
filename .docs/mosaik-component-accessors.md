# Mosaik component accessors

The `cursor-adapter-mosaik` Nx project uses the `mosaik-accessor-transform` executor in `infra/nx-tasks`. It reads the installed Foundation `custom-elements.json` and writes a named accessor class and a separate `index.ts` per component. For example, `src/components/select/SelectAccessor.ts` declares `SelectAccessor`, and `src/components/select/index.ts` exports it. The `@Accessor` decorator associates the class with its tag and public API. The package build runs the transform automatically. These commands regenerate or check the entries:

```sh
yarn nx run cursor-adapter-mosaik:generate
yarn nx run cursor-adapter-mosaik:generate:check
```

Import the named class from its component subpath, which is the tag without `mosaik-`. Select the classes the application needs with `withCursorAccessors(...)`. The app's provider uses those features to create one shared `CursorAccessorRegistry`. The registry resolves each configured class by its element tag and binds it to a mounted element. Each subpath can be bundled independently.

```ts
import { selectOption } from '@pixel-brewery/cursor-adapter-mosaik';
import { ButtonAccessor } from '@pixel-brewery/cursor-adapter-mosaik/components/button';
import { CursorAccessorRegistry, withCursorAccessors } from '@pixel-brewery/cursor-browser';

const registry = new CursorAccessorRegistry(withCursorAccessors(ButtonAccessor));
const button = registry.bind(settingsButtonElement, ButtonAccessor);

// Inside host-registered, authorized cursor actions:
await button.activate(surface, signal);
await selectOption(cursorStyleElement, surface, { kind: 'next' }, signal);
```

Every accessor can read declared public properties, set writable properties, call declared public methods and observe declared events. `activate` guides the cursor to an actionable DOM element and clicks it. Composite controls can supply an explicit activation target. These operations are available to host code; importing an accessor does not grant the assistant permission to use them.

In Angular, configure the registry at the application boundary:

```ts
import { SelectAccessor } from '@pixel-brewery/cursor-adapter-mosaik/components/select';
import { provideCursor, withCursorAccessors } from '@pixel-brewery/cursor-angular';

export const appConfig = {
    providers: [provideCursor(withCursorAccessors(SelectAccessor))],
};
```

Place `cursorTarget` on the Mosaik control within a `cursorSurface`. An action directive can inject `CursorAccessorRegistry` from `@pixel-brewery/cursor-angular`, then bind the mounted `ElementRef.nativeElement`. Calling `registry.bind(element)` resolves the class by tag. The host registers the actions it wants the assistant to use for that target.

| Framework | Configuration | Registry lookup |
| --- | --- | --- |
| Angular | `provideCursor(withCursorAccessors(SelectAccessor))` in application providers | `inject(CursorAccessorRegistry)` |
| React | `<CursorProvider features={[withCursorAccessors(SelectAccessor)]}>` at the app root | `useCursorAccessorRegistry()` |
| Vue | `provideCursor(withCursorAccessors(SelectAccessor))` in root setup, or `CursorProvider` with its `features` prop | `useCursorAccessorRegistry()` in a descendant |
| Svelte | `provideCursor(withCursorAccessors(SelectAccessor))` during root component initialization | `useCursorAccessorRegistry()` in a descendant |

The manifest describes the public members that each generated `ElementAccessor` exposes. Host code chooses which actions to register and validates the inputs. A shared action can be reused when the target implements its documented contract. For example, `selectOption` works with Select and Combo through their public dropdown and option APIs. It verifies the selected state on the option itself and leaves already selected options alone, so repeated requests do not toggle them off.

A data table action can map a column name to its configured key, call `sort(key, direction)` or `regroup(keys)`, and verify `sortExpressions` or `groupBy`. When replacing the full sort in a table that supports multiple sort keys, the host can set `sortExpressions` directly if it owns the controlled state. `sort()` adds or updates one key in that mode and participates in the table's cancelable sort events. A scheduler action instead resolves a date or event key and uses `navigateToDate` or `activateEvent`. A chart action can resolve a series and call `setSeriesVisible`. The host chooses a visible DOM target for guidance when it can resolve one.
