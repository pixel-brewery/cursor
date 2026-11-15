// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-router-anchor` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-router-anchor',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'hasActivated',
        'label',
        'lang',
        'ref',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasActivated',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class RouterAnchorAccessor extends ElementAccessor {}
