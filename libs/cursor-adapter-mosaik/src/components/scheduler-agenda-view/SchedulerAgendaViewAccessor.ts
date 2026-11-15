// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-agenda-view` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-agenda-view',
    properties: [
        'appearance',
        'blackoutDates',
        'changed',
        'collectedEvents',
        'connected',
        'controlValue',
        'currentTime',
        'dayFormat',
        'daysAhead',
        'dir',
        'disabled',
        'disconnected',
        'firstDayOfWeek',
        'intl',
        'isTodayHighlighted',
        'isWeekendHighlighted',
        'lang',
        'locale',
        'monthDayFormat',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
        'selectAllow',
        'size',
        'specialDates',
        'startDate',
        'themeName',
        'timeFormat',
        'timezone',
        'variant',
        'view',
        'weekdayFormat',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
        'view',
    ],
    methods: [
        'activateEvent',
        'addEventListener',
        'adoptStyle',
        'emit',
        'now',
        'off',
        'on',
        'requestUpdate',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
    ],
})
export class SchedulerAgendaViewAccessor extends ElementAccessor {}
