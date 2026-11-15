// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-body` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-body',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'hasPinnedBottom',
        'hasPinnedTop',
        'isEmpty',
        'lang',
        'projection',
        'table',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasPinnedBottom',
        'hasPinnedTop',
        'isEmpty',
        'projection',
        'table',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'getProjectedRows',
        'off',
        'on',
        'project',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class TableBodyAccessor extends ElementAccessor {}
