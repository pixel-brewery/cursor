// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-tick-labels` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-tick-labels',
    properties: [
        'changed',
        'color',
        'connected',
        'controlValue',
        'count',
        'decimals',
        'dir',
        'disconnected',
        'font',
        'fontSize',
        'format',
        'formatter',
        'lang',
        'offset',
        'opacity',
        'themeName',
        'weight',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'renderGauge',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class GaugeTickLabelsAccessor extends ElementAccessor {}
