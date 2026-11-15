// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-masonry` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-masonry',
    properties: [
        'changed',
        'columns',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fit',
        'gap',
        'lang',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class MasonryAccessor extends ElementAccessor {}
