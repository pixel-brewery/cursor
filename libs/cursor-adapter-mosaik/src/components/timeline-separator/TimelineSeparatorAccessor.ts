// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-timeline-separator` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-timeline-separator',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'description',
        'dir',
        'disconnected',
        'icon',
        'label',
        'lang',
        'oppositeOrientation',
        'themeName',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TimelineSeparatorAccessor extends ElementAccessor {}
