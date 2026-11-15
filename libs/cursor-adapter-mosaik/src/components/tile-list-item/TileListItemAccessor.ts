// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tile-list-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tile-list-item',
    properties: [
        'changed',
        'col',
        'colSpan',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'order',
        'reorderable',
        'resizable',
        'row',
        'rowSpan',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TileListItemAccessor extends ElementAccessor {}
