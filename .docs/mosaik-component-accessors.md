# Mosaik component accessors

The `cursor-adapter-mosaik` Nx project generates a module for every concrete Mosaik Foundation element declared in its installed `custom-elements.json`. The build runs generation automatically. To regenerate and verify the modules directly:

```sh
yarn nx run cursor-adapter-mosaik:generate
yarn nx run cursor-adapter-mosaik:generate --mode=check
```

Import the accessor for the component you use. The subpath is the element tag without `mosaik-`. Pass the DOM element from your view to `bind`. The same API works with Angular, React, Vue, Preact and plain DOM code. The root package exports shared types; individual subpaths do not import a component catalog or register elements.

```ts
import { accessor as buttonAccessor } from '@pixel-brewery/cursor-adapter-mosaik/components/button';
import { accessor as selectAccessor } from '@pixel-brewery/cursor-adapter-mosaik/components/select';

const button = buttonAccessor.bind(settingsButtonElement);
const select = selectAccessor.bind(cursorStyleElement);

// Inside host-registered, authorized cursor actions:
await button.activate(surface, signal);
await select.selectOption(surface, { kind: 'next' }, signal);
```

Every accessor can read declared public properties, set writable properties, call declared public methods and observe declared events. `activate` guides the cursor to an actionable DOM element and clicks it. Composite controls can supply an explicit activation target. These operations are available to host code; importing an accessor does not grant the assistant permission to use them.

The manifest describes which members exist. The generator matches reusable interaction contracts where the public API describes the required steps. A single-choice dropdown, for example, needs an open/close API, options, a selected option and a single value. One shared implementation handles that sequence for every matching element, including opening the dropdown, pointing to the option and checking that it was selected. New components automatically receive the general accessor and any matching interaction. Add a shared pattern when a family of components needs another guided sequence.
