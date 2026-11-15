// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-tooltip` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-tooltip',
    properties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'crosshair',
        'dir',
        'disconnected',
        'isOpen',
        'lang',
        'mode',
        'model',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'chartLayer',
        'connected',
        'controlValue',
        'disconnected',
        'isOpen',
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
export class ChartTooltipAccessor extends ElementAccessor {}
