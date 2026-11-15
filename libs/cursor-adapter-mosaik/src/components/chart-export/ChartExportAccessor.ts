// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-export` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-export',
    properties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fileName',
        'formatList',
        'formats',
        'lang',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'disconnected',
        'formatList',
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
export class ChartExportAccessor extends ElementAccessor {}
