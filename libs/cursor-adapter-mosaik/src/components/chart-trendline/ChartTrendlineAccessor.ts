// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-trendline` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-trendline',
    properties: [
        'changed',
        'chartLayer',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'label',
        'lang',
        'period',
        'series',
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
export class ChartTrendlineAccessor extends ElementAccessor {}
