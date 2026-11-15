// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-tooltip` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-tooltip',
    properties: [
        'at',
        'avoidCollisions',
        'changed',
        'collisionPadding',
        'color',
        'connected',
        'contentRenderer',
        'controlValue',
        'decimals',
        'dir',
        'disconnected',
        'format',
        'formatter',
        'gap',
        'isOpen',
        'label',
        'lang',
        'offset',
        'opacity',
        'position',
        'side',
        'themeName',
        'unit',
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
export class GaugeTooltipAccessor extends ElementAccessor {}
