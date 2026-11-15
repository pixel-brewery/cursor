// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-header-row` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-header-row',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'intl',
        'lang',
        'themeName',
        'visibleColumnCount',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'intl',
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
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class TableHeaderRowAccessor extends ElementAccessor {}
