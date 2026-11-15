// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-meter-ring` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-meter-ring',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'diameter',
        'dir',
        'disabled',
        'disconnected',
        'high',
        'label',
        'lang',
        'low',
        'markerPosition',
        'max',
        'min',
        'optimum',
        'orientation',
        'percent',
        'radius',
        'range',
        'rangeValueChanged',
        'scale',
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
        'markerPosition',
        'percent',
        'range',
        'rangeValueChanged',
        'segments',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class MeterRingAccessor extends ElementAccessor {}
