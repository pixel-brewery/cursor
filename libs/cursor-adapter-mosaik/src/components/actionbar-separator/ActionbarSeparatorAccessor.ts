// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-actionbar-separator` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-actionbar-separator',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'orientation',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ActionbarSeparatorAccessor extends ElementAccessor {}
