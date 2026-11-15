// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-box` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-box',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'cornered',
        'dir',
        'disconnected',
        'fit',
        'height',
        'highlighted',
        'inset',
        'lang',
        'themeName',
        'width',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class BoxAccessor extends ElementAccessor {}
