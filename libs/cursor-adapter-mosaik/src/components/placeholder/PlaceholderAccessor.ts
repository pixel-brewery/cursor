// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-placeholder` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-placeholder',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'height',
        'lang',
        'themeName',
        'width',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class PlaceholderAccessor extends ElementAccessor {}
