// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tile-manager` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tile-manager',
    properties: [
        'changed',
        'columnCount',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'dragMode',
        'gap',
        'intl',
        'lang',
        'layoutChanged',
        'maximizedTile',
        'minColumnWidth',
        'minRowHeight',
        'resizeMode',
        'themeName',
        'tiles',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'layoutChanged',
        'maximizedTile',
        'tiles',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'loadLayout',
        'loadLayoutFromJSON',
        'off',
        'on',
        'requestUpdate',
        'saveLayout',
        'saveLayoutAsJSON',
    ],
    events: ['changed', 'connected', 'disconnected', 'layoutChanged'],
})
export class TileManagerAccessor extends ElementAccessor {}
