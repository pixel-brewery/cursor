// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-reveal` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-reveal',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'effect',
        'lang',
        'motionState',
        'repeat',
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
export class RevealAccessor extends ElementAccessor {}
