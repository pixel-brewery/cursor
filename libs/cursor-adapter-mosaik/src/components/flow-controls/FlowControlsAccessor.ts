// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-controls` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-controls',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'showZoom',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class FlowControlsAccessor extends ElementAccessor {}
