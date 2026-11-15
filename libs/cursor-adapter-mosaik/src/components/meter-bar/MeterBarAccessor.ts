// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-meter-bar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-meter-bar',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'high',
        'label',
        'lang',
        'low',
        'max',
        'min',
        'optimum',
        'orientation',
        'percent',
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
        'disconnected',
        'percent',
        'range',
        'rangeValueChanged',
        'segments',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class MeterBarAccessor extends ElementAccessor {}
