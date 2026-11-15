// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-hint` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-hint',
    properties: [
        'alignment',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'lang',
        'text',
        'textOverflow',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class HintAccessor extends ElementAccessor {}
