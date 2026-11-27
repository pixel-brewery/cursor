// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-series` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-series',
    properties: [
        'binValue',
        'binWidth',
        'bins',
        'changed',
        'chartLayer',
        'color',
        'connected',
        'controlValue',
        'curve',
        'dash',
        'data',
        'dir',
        'disconnected',
        'fieldChildren',
        'fieldClose',
        'fieldColor',
        'fieldHigh',
        'fieldLow',
        'fieldOpen',
        'fieldSize',
        'fieldTotal',
        'fieldValues',
        'fieldX',
        'fieldY',
        'innerRadius',
        'lang',
        'markerShape',
        'markers',
        'maxPoints',
        'minStageWidth',
        'name',
        'pattern',
        'stack',
        'themeName',
        'type',
        'yAxis',
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
        'appendData',
        'emit',
        'off',
        'on',
        'renderChart',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChartSeriesAccessor extends ElementAccessor {}
