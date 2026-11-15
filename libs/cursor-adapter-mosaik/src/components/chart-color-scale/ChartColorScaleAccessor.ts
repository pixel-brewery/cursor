// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-color-scale` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-color-scale',
    properties: [
        'center',
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'max',
        'min',
        'steps',
        'themeName',
        'type',
    ],
    readOnlyProperties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'renderChart',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChartColorScaleAccessor extends ElementAccessor {}
