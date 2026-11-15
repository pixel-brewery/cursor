// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-data-labels` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-data-labels',
    properties: [
        'badge',
        'changed',
        'chartLayer',
        'connected',
        'content',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'position',
        'themeName',
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
export class ChartDataLabelsAccessor extends ElementAccessor {}
