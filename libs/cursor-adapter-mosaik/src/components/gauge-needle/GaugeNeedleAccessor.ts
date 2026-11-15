// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-needle` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-needle',
    properties: [
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'gap',
        'lang',
        'length',
        'needleStyle',
        'offset',
        'opacity',
        'tail',
        'tailColor',
        'tailDot',
        'themeName',
        'turns',
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
export class GaugeNeedleAccessor extends ElementAccessor {}
