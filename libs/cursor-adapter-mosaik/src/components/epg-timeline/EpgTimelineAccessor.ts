// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-epg-timeline` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-epg-timeline',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dayWidth',
        'dir',
        'disabled',
        'disconnected',
        'format',
        'hasSidebar',
        'hourWidth',
        'lang',
        'locale',
        'numberOfHoursInDay',
        'offsetStartHoursRange',
        'sidebarWidth',
        'themeName',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class EpgTimelineAccessor extends ElementAccessor {}
