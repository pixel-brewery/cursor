// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-absolute` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-absolute',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fit',
        'items',
        'lang',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'items',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class AbsoluteAccessor extends ElementAccessor {}
