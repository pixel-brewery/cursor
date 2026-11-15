// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-dot` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-dot',
    properties: [
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'halo',
        'haloColor',
        'lang',
        'offset',
        'opacity',
        'radius',
        'themeName',
        'turns',
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
export class GaugeDotAccessor extends ElementAccessor {}
