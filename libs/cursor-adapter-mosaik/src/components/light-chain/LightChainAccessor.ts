// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-light-chain` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-light-chain',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disabled',
        'disconnected',
        'lang',
        'state',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class LightChainAccessor extends ElementAccessor {}
