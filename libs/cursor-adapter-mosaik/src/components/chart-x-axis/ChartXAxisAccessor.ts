// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-x-axis` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-x-axis',
    properties: [
        'categories',
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
        'groups',
        'label',
        'lang',
        'max',
        'min',
        'position',
        'themeName',
        'tickCount',
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
export class ChartXAxisAccessor extends ElementAccessor {}
