// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-wrap` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-wrap',
    properties: [
        'changed',
        'columns',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fit',
        'gap',
        'items',
        'lang',
        'orientation',
        'reverse',
        'themeName',
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
export class WrapAccessor extends ElementAccessor {}
