// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-inset` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-inset',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'endAngle',
        'initialValue',
        'label',
        'lang',
        'max',
        'min',
        'radius',
        'rangeValueChanged',
        'rotate',
        'scale',
        'startAngle',
        'targetValue',
        'themeName',
        'transition',
        'value',
        'wrap',
        'x',
        'y',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'rangeValueChanged',
        'targetValue',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'renderGauge',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class GaugeInsetAccessor extends ElementAccessor {}
