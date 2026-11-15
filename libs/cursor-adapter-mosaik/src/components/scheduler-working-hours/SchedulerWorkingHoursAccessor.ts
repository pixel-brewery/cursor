// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-working-hours` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-working-hours',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'daysOfWeek',
        'dir',
        'disconnected',
        'end',
        'lang',
        'start',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class SchedulerWorkingHoursAccessor extends ElementAccessor {}
