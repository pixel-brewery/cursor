// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-detail-row` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-detail-row',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'lang',
        'themeName',
        'value',
        'visibleColumnCount',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
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
export class TableDetailRowAccessor extends ElementAccessor {}
