// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-kbd-shortcut` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-kbd-shortcut',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'gesture',
        'lang',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['change', 'changed', 'connected', 'disconnected'],
})
export class KbdShortcutAccessor extends ElementAccessor {}
