// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-ticks` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-ticks',
    properties: [
        'cap',
        'changed',
        'color',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disconnected',
        'lang',
        'length',
        'offset',
        'opacity',
        'themeName',
        'width',
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
export class GaugeTicksAccessor extends ElementAccessor {}
