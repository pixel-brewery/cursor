// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-reference-band` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-reference-band',
    properties: [
        'categoryFrom',
        'categoryTo',
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'from',
        'label',
        'lang',
        'themeName',
        'to',
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
        'emit',
        'off',
        'on',
        'renderChart',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChartReferenceBandAccessor extends ElementAccessor {}
