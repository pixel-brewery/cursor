// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-slider2` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-slider2',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'gap',
        'lang',
        'max',
        'min',
        'orientation',
        'showValueIndicator',
        'step',
        'themeName',
        'thickness',
        'value',
        'valueChanged',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'valueChanged',
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
export class Slider2Accessor extends ElementAccessor {}
