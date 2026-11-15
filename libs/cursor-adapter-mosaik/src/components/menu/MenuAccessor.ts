// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-menu` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-menu',
    properties: [
        'activated',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'inset',
        'label',
        'lang',
        'themeName',
        'virtualized',
    ],
    readOnlyProperties: [
        'activated',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['activated', 'changed', 'connected', 'disconnected'],
})
export class MenuAccessor extends ElementAccessor {}
