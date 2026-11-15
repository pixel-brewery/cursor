// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment-bar-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment-bar-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dashed',
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
export class SegmentBarItemAccessor extends ElementAccessor {}
