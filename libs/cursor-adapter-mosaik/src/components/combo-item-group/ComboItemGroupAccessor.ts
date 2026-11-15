// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-combo-item-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-combo-item-group',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disconnected',
        'header',
        'items',
        'lang',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'disconnected',
        'items',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ComboItemGroupAccessor extends ElementAccessor {}
