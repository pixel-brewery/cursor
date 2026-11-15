// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-avatar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-avatar',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'displayMode',
        'hasBadge',
        'icon',
        'lang',
        'size',
        'src',
        'text',
        'textAccessor',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'displayMode',
        'hasBadge',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'changeTextAccessor',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class AvatarAccessor extends ElementAccessor {}
