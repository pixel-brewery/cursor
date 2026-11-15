// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-stack` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-stack',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fit',
        'gap',
        'horizontalAlignment',
        'items',
        'lang',
        'orientation',
        'reverse',
        'themeName',
        'verticalAlignment',
        'wrap',
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
export class StackAccessor extends ElementAccessor {}
