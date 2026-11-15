// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-resource` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-resource',
    properties: [
        'avatar',
        'blockedRanges',
        'bookable',
        'capacity',
        'changed',
        'connected',
        'controlValue',
        'description',
        'dir',
        'disabled',
        'disconnected',
        'expanded',
        'lang',
        'metadata',
        'resourceId',
        'title',
        'workingHours',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class SchedulerResourceAccessor extends ElementAccessor {}
