// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-timeline` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-timeline',
    properties: [
        'align',
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
export class TimelineAccessor extends ElementAccessor {}
