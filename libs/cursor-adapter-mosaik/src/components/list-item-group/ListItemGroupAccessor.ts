// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-list-item-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-list-item-group',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disabled',
        'disconnected',
        'expandable',
        'expanded',
        'header',
        'isSticky',
        'items',
        'key',
        'lang',
        'level',
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
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'toggle',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ListItemGroupAccessor extends ElementAccessor {}
