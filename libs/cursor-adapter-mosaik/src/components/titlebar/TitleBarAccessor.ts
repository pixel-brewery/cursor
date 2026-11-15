// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-titlebar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-titlebar',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'icon',
        'intl',
        'lang',
        'themeName',
        'title',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TitleBarAccessor extends ElementAccessor {}
