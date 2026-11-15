// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-text` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-text',
    properties: [
        'anchor',
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'font',
        'fontSize',
        'lang',
        'offset',
        'opacity',
        'text',
        'themeName',
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
export class GaugeTextAccessor extends ElementAccessor {}
