// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chat-message-reaction` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chat-message-reaction',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'count',
        'dir',
        'disabled',
        'disconnected',
        'emoji',
        'lang',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChatMessageReactionAccessor extends ElementAccessor {}
