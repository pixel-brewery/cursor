// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-emoji` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-emoji',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'emoji',
        'lang',
        'size',
        'themeName',
        'unicode',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'toEmoji',
        'toUnicode',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class EmojiAccessor extends ElementAccessor {}
