// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-globe` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-globe',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'density',
        'depthFade',
        'dir',
        'disconnected',
        'dotSize',
        'duration',
        'lang',
        'locations',
        'motionState',
        'particleCount',
        'running',
        'themeName',
        'tilt',
        'twinkle',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'motionState',
        'running',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class GlobeAccessor extends ElementAccessor {}
