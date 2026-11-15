// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-marks` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-marks',
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
        'values',
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
export class GaugeMarksAccessor extends ElementAccessor {}
