// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-knob` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-knob',
    properties: [
        'angle',
        'appearance',
        'bodyDiameter',
        'changed',
        'connected',
        'controlValue',
        'diameter',
        'dir',
        'disabled',
        'disconnected',
        'endAngle',
        'invalid',
        'isFocused',
        'label',
        'lang',
        'max',
        'min',
        'mode',
        'pxPerStep',
        'radius',
        'rangeValueChanged',
        'showValue',
        'startAngle',
        'step',
        'themeName',
        'tickGap',
        'tickLength',
        'tickMarks',
        'tickPlacement',
        'ticks',
        'value',
        'valueAccessor',
        'variant',
        'wheel',
    ],
    readOnlyProperties: [
        'angle',
        'bodyDiameter',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'radius',
        'rangeValueChanged',
        'tickMarks',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'checkValidity',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'stepDown',
        'stepUp',
    ],
    events: [
        'change',
        'changed',
        'connected',
        'disconnected',
        'input',
        'rangeValueChanged',
    ],
})
export class KnobAccessor extends ElementAccessor {}
