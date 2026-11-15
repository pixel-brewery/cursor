// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chat-marker` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chat-marker',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'horizontalContentAlignment',
        'icon',
        'isSticky',
        'lang',
        'orientation',
        'text',
        'themeName',
        'variant',
        'verticalContentAlignment',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChatMarkerAccessor extends ElementAccessor {}
