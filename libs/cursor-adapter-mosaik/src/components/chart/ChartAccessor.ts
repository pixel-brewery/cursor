// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart',
    properties: [
        'activePoint',
        'changed',
        'chartActivePointChanged',
        'chartCategoryToggled',
        'chartDrillChanged',
        'chartPointClicked',
        'chartSeriesToggled',
        'chartZoomChanged',
        'connected',
        'controlValue',
        'dataTable',
        'dir',
        'disconnected',
        'frame',
        'intl',
        'isBusy',
        'label',
        'lang',
        'locale',
        'orientation',
        'resolvedLocale',
        'sparkline',
        'themeName',
        'treemapPath',
        'zoomRange',
    ],
    readOnlyProperties: [
        'activePoint',
        'changed',
        'chartActivePointChanged',
        'chartCategoryToggled',
        'chartDrillChanged',
        'chartPointClicked',
        'chartSeriesToggled',
        'chartZoomChanged',
        'connected',
        'controlValue',
        'dataTable',
        'disconnected',
        'frame',
        'resolvedLocale',
        'treemapPath',
        'zoomRange',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'drillTo',
        'drillUp',
        'emit',
        'exportAs',
        'isCategoryVisible',
        'isSeriesVisible',
        'off',
        'on',
        'requestUpdate',
        'resetZoom',
        'setActivePoint',
        'setCategoryVisible',
        'setSeriesVisible',
        'toCsv',
        'toImage',
        'toSvg',
        'zoomTo',
    ],
    events: [
        'changed',
        'chartActivePointChanged',
        'chartCategoryToggled',
        'chartDrillChanged',
        'chartPointClicked',
        'chartSeriesToggled',
        'chartZoomChanged',
        'connected',
        'disconnected',
    ],
})
export class ChartAccessor extends ElementAccessor {}
