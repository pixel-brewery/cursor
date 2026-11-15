// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-zones` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-zones',
    properties: [
        'cap',
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'endCap',
        'gap',
        'lang',
        'offset',
        'opacity',
        'themeName',
        'width',
        'zones',
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
export class GaugeZonesAccessor extends ElementAccessor {}
