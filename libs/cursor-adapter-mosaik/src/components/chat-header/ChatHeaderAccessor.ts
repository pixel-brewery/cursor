// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chat-header` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chat-header',
    properties: [
        'alignment',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'lang',
        'subTitle',
        'themeName',
        'title',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChatHeaderAccessor extends ElementAccessor {}
