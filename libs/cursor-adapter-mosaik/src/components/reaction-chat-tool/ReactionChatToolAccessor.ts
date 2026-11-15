// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-reaction-chat-tool` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-reaction-chat-tool',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disabledWhen',
        'disconnected',
        'dock',
        'lang',
        'reactions',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'attach',
        'detach',
        'emit',
        'execute',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ReactionChatToolAccessor extends ElementAccessor {}
