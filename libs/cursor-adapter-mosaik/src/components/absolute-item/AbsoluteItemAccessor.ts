// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-absolute-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-absolute-item',
    properties: [
        'bottom',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'left',
        'right',
        'themeName',
        'top',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class AbsoluteItemAccessor extends ElementAccessor {}
