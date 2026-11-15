// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-group-row` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-group-row',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disabled',
        'disconnected',
        'expanded',
        'label',
        'lang',
        'level',
        'selected',
        'summaries',
        'tableGroupRowSelect',
        'tableGroupRowToggle',
        'themeName',
        'value',
        'visibleColumnCount',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'tableGroupRowSelect',
        'tableGroupRowToggle',
        'visibleColumnCount',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'getGridCells',
        'off',
        'on',
        'requestUpdate',
        'toggle',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'tableGroupRowSelect',
        'tableGroupRowToggle',
    ],
})
export class TableGroupRowAccessor extends ElementAccessor {}
