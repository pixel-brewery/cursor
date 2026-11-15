// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-particles` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-particles',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'effect',
        'lang',
        'motionState',
        'quantity',
        'running',
        'size',
        'speed',
        'themeName',
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
    methods: [
        'addEventListener',
        'adoptStyle',
        'burst',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ParticlesAccessor extends ElementAccessor {}
