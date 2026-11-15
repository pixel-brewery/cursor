// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-value` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-value',
    properties: [
        'anchor',
        'changed',
        'color',
        'connected',
        'controlValue',
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
        'unit',
        'weight',
        'x',
        'y',
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
export class GaugeValueAccessor extends ElementAccessor {}
