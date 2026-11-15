// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-minimap` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-minimap',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'label',
        'lang',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class FlowMinimapAccessor extends ElementAccessor {}
