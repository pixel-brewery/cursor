// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-resource-time-grid-view` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-resource-time-grid-view',
    properties: [
        'allDayVisibility',
        'appearance',
        'blackoutDates',
        'changed',
        'collectedEvents',
        'connected',
        'controlValue',
        'currentTime',
        'dayFormat',
        'days',
        'daysOfWeek',
        'dir',
        'disabled',
        'disconnected',
        'eventLayout',
        'eventsByDay',
        'firstDayOfWeek',
        'gestureEnabled',
        'hourEnd',
        'hourStart',
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
        'stepMinutes',
        'themeName',
        'timeFormat',
        'timeGridVirtualScroll',
        'timescaleFormat',
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
        'eventsByDay',
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
export class SchedulerResourceTimeGridViewAccessor extends ElementAccessor {}
