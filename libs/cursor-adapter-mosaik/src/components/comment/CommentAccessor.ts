// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-comment` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-comment',
    properties: [
        'at',
        'author',
        'changed',
        'connected',
        'content',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'lang',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class CommentAccessor extends ElementAccessor {}
