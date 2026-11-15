// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-footer-item-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-footer-item-group',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'header',
        'lang',
        'open',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'open',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'toggle',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class FooterItemGroupAccessor extends ElementAccessor {}
