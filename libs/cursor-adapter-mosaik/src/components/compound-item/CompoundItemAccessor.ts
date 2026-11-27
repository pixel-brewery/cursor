// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-compound-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-compound-item',
    properties: [
        'changed',
        'collection',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'expanded',
        'itemKey',
        'label',
        'lang',
        'listDisabled',
        'listLabel',
        'status',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'collection',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class CompoundItemAccessor extends ElementAccessor {}
