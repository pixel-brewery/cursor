// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-month-view` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-month-view',
    properties: [
        'appearance',
        'blackoutDates',
        'changed',
        'collectedEvents',
        'connected',
        'controlValue',
        'currentTime',
        'dayFormat',
        'dir',
        'disabled',
        'disconnected',
        'firstDayOfWeek',
        'fixedWeekCount',
        'intl',
        'isTodayHighlighted',
        'isWeekendHighlighted',
        'lang',
        'locale',
        'maxEventsPerDay',
        'monthCount',
        'monthDayFormat',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
        'schedulerShowMoreEvents',
        'selectAllow',
        'showAdjacent',
        'showWeekNumbers',
        'size',
        'specialDates',
        'startDate',
        'themeName',
        'timeFormat',
        'timezone',
        'variant',
        'view',
        'weekCount',
        'weekdayFormat',
        'weeks',
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
        'schedulerShowMoreEvents',
        'view',
        'weeks',
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
        'showMoreEvents',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
        'schedulerShowMoreEvents',
    ],
})
export class SchedulerMonthViewAccessor extends ElementAccessor {}
