// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-footer-cell` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-footer-cell',
    properties: [
        'changed',
        'columnHidden',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'lang',
        'summary',
        'text',
        'textOverflow',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TableFooterCellAccessor extends ElementAccessor {}
