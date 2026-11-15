// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-helix` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-helix',
    properties: [
        'band',
        'bandSpeed',
        'bleed',
        'changed',
        'colors',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disconnected',
        'duration',
        'error',
        'finish',
        'lang',
        'loaded',
        'loading',
        'motionState',
        'running',
        'themeName',
        'thickness',
        'tilt',
        'twist',
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
export class HelixAccessor extends ElementAccessor {}
