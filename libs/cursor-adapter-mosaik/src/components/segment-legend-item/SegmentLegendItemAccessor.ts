// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment-legend-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment-legend-item',
    properties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'dir',
        'disconnected',
        'for',
        'label',
        'lang',
        'legendText',
        'markerFill',
        'themeName',
        'valueText',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'disconnected',
        'legendText',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'attach',
        'detach',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class SegmentLegendItemAccessor extends ElementAccessor {}
