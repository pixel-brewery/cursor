// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-listing-item-marker` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-listing-item-marker',
    properties: [
        'appearance',
        'bulletType',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'index',
        'lang',
        'numberingType',
        'size',
        'themeName',
        'type',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ListingItemMarkerAccessor extends ElementAccessor {}
