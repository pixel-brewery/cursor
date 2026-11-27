// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-y-axis` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-y-axis',
    properties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'currency',
        'dateFormat',
        'dir',
        'disconnected',
        'format',
        'formatter',
        'label',
        'lang',
        'max',
        'min',
        'position',
        'stackType',
        'themeName',
        'tickCount',
        'tickFormatter',
        'timezone',
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
export class ChartYAxisAccessor extends ElementAccessor {}
