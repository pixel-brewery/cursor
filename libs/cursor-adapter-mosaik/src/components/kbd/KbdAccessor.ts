// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-kbd` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-kbd',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isCompact',
        'lang',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class KbdAccessor extends ElementAccessor {}
