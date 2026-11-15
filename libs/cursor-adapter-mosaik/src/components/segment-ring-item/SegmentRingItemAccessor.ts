// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment-ring-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment-ring-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isEmphasized',
        'label',
        'lang',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isEmphasized',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class SegmentRingItemAccessor extends ElementAccessor {}
