// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-router-link` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-router-link',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'href',
        'lang',
        'query',
        'target',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'toString',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class RouterLinkAccessor extends ElementAccessor {}
