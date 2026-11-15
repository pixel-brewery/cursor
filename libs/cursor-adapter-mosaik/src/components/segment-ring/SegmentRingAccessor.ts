// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment-ring` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment-ring',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'diameter',
        'dir',
        'disabled',
        'disconnected',
        'effectiveRadius',
        'items',
        'label',
        'lang',
        'max',
        'min',
        'orientation',
        'radius',
        'rangeValueChanged',
        'segmentGap',
        'segments',
        'themeName',
        'thickness',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'diameter',
        'disconnected',
        'effectiveRadius',
        'items',
        'rangeValueChanged',
        'segments',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class SegmentRingAccessor extends ElementAccessor {}
