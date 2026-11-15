// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-spline` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-spline',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'error',
        'interactive',
        'lang',
        'loaded',
        'loading',
        'motionState',
        'running',
        'scene',
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
export class SplineAccessor extends ElementAccessor {}
