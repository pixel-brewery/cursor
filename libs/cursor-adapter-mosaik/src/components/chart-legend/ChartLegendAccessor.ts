// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-legend` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-legend',
    properties: [
        'changed',
        'chartLayer',
        'colorScale',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'entries',
        'lang',
        'position',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'chartLayer',
        'colorScale',
        'connected',
        'controlValue',
        'disconnected',
        'entries',
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
export class ChartLegendAccessor extends ElementAccessor {}
