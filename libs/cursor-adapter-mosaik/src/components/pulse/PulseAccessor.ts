// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-pulse` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-pulse',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'dashed',
        'dir',
        'disconnected',
        'duration',
        'filled',
        'lang',
        'motionState',
        'themeName',
        'variant',
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
export class PulseAccessor extends ElementAccessor {}
