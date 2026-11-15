// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-epg-minimap` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-epg-minimap',
    properties: [
        'changed',
        'channels',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lanes',
        'lang',
        'themeName',
        'visibleEnd',
        'visibleStart',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'jumpToRow'],
})
export class EpgMinimapAccessor extends ElementAccessor {}
