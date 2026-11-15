// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-navigator` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-navigator',
    properties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'model',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'disconnected',
        'model',
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
export class ChartNavigatorAccessor extends ElementAccessor {}
