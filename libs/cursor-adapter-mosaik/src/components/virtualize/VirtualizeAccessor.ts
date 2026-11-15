// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-virtualize` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-virtualize',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'items',
        'keyFunction',
        'lang',
        'layout',
        'renderItem',
        'scroller',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class VirtualizeAccessor extends ElementAccessor {}
