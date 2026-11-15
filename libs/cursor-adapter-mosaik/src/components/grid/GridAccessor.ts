// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-grid` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-grid',
    properties: [
        'changed',
        'columnDefinitions',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'gap',
        'horizontalAlignment',
        'items',
        'lang',
        'rowDefinitions',
        'themeName',
        'verticalAlignment',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'items',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class GridAccessor extends ElementAccessor {}
