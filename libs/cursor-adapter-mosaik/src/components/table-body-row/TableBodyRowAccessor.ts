// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-body-row` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-body-row',
    properties: [
        'changed',
        'childrenLoading',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'expandable',
        'expanded',
        'intl',
        'isSelected',
        'key',
        'lang',
        'level',
        'pinned',
        'position',
        'rowNumber',
        'selected',
        'selectionIndeterminate',
        'themeName',
        'value',
        'visibleColumnCount',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'intl',
        'position',
        'selected',
        'visibleColumnCount',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'deselect',
        'emit',
        'getGridCells',
        'off',
        'on',
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class TableBodyRowAccessor extends ElementAccessor {}
