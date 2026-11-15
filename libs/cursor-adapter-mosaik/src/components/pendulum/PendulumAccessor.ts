// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-pendulum` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-pendulum',
    properties: [
        'alt',
        'anchor',
        'changed',
        'connected',
        'controlValue',
        'damping',
        'dir',
        'disconnected',
        'draggable',
        'error',
        'lang',
        'loaded',
        'loading',
        'motionState',
        'ropeColor',
        'ropeLength',
        'running',
        'src',
        'stiffness',
        'sway',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'error',
        'loaded',
        'loading',
        'motionState',
        'running',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class PendulumAccessor extends ElementAccessor {}
