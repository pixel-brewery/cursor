// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-mention-text` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-mention-text',
    properties: [
        'cardProvider',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'document',
        'formatter',
        'isInteractive',
        'lang',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'mentionInvoked'],
})
export class MentionTextAccessor extends ElementAccessor {}
