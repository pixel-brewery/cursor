// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment-bar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment-bar',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'items',
        'label',
        'lang',
        'max',
        'min',
        'orientation',
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
        'disconnected',
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
export class SegmentBarAccessor extends ElementAccessor {}
