// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-annotation` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-annotation',
    properties: [
        'category',
        'changed',
        'chartAnnotationMoved',
        'chartLayer',
        'connected',
        'controlValue',
        'detail',
        'dir',
        'disconnected',
        'label',
        'lang',
        'movable',
        'themeName',
        'value',
        'yAxis',
    ],
    readOnlyProperties: [
        'changed',
        'chartAnnotationMoved',
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
    events: ['changed', 'chartAnnotationMoved', 'connected', 'disconnected'],
})
export class ChartAnnotationAccessor extends ElementAccessor {}
