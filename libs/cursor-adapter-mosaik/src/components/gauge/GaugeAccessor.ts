// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'endAngle',
        'fit',
        'initialValue',
        'label',
        'lang',
        'max',
        'min',
        'padding',
        'radius',
        'rangeValueChanged',
        'rotate',
        'startAngle',
        'targetValue',
        'themeName',
        'transition',
        'value',
        'wrap',
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
export class GaugeAccessor extends ElementAccessor {}
