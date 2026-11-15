// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-parallax` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-parallax',
    properties: [
        'axis',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'distance',
        'lang',
        'motionState',
        'reverse',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'motionState',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ParallaxAccessor extends ElementAccessor {}
