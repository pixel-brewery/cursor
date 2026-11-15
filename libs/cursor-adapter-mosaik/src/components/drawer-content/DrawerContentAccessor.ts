// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-drawer-content` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-drawer-content',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isOpen',
        'lang',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class DrawerContentAccessor extends ElementAccessor {}
