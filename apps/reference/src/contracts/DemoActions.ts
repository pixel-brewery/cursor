type DemoColumn = 'name' | 'region' | 'revenue';

type DemoCommand =
    | { readonly target: 'region' | 'table' | 'checkbox'; readonly kind: 'show' }
    | { readonly target: 'region'; readonly kind: 'select'; readonly value: 'north' | 'south' | 'west' }
    | {
          readonly target: 'table';
          readonly kind: 'sort';
          readonly column: DemoColumn;
          readonly direction: 'asc' | 'desc';
      }
    | { readonly target: 'table'; readonly kind: 'group'; readonly columns: readonly DemoColumn[] }
    | { readonly target: 'checkbox'; readonly kind: 'set-checked'; readonly checked: boolean };

/** Finite host commands for the controls in the reference demo. */
export const demoCommands = {
    'show-demo-region': { target: 'region', kind: 'show' },
    'show-demo-table': { target: 'table', kind: 'show' },
    'show-demo-checkbox': { target: 'checkbox', kind: 'show' },
    'demo-select-north': { target: 'region', kind: 'select', value: 'north' },
    'demo-select-south': { target: 'region', kind: 'select', value: 'south' },
    'demo-select-west': { target: 'region', kind: 'select', value: 'west' },
    'demo-sort-name-asc': { target: 'table', kind: 'sort', column: 'name', direction: 'asc' },
    'demo-sort-name-desc': { target: 'table', kind: 'sort', column: 'name', direction: 'desc' },
    'demo-sort-region-asc': { target: 'table', kind: 'sort', column: 'region', direction: 'asc' },
    'demo-sort-region-desc': { target: 'table', kind: 'sort', column: 'region', direction: 'desc' },
    'demo-sort-revenue-asc': { target: 'table', kind: 'sort', column: 'revenue', direction: 'asc' },
    'demo-sort-revenue-desc': { target: 'table', kind: 'sort', column: 'revenue', direction: 'desc' },
    'demo-group-name': { target: 'table', kind: 'group', columns: ['name'] },
    'demo-group-region': { target: 'table', kind: 'group', columns: ['region'] },
    'demo-group-revenue': { target: 'table', kind: 'group', columns: ['revenue'] },
    'demo-clear-group': { target: 'table', kind: 'group', columns: [] },
    'demo-check-checkbox': { target: 'checkbox', kind: 'set-checked', checked: true },
    'demo-uncheck-checkbox': { target: 'checkbox', kind: 'set-checked', checked: false },
} as const satisfies Record<string, DemoCommand>;

/** A model-selectable action supported by the demo. */
export type DemoAction = keyof typeof demoCommands;

/**
 * Checks whether the action belongs to the demo command catalog.
 *
 * @param action - The action to check.
 * @returns Whether the catalog contains the action.
 */
export function isDemoAction(action: string): action is DemoAction {
    return Object.hasOwn(demoCommands, action);
}
