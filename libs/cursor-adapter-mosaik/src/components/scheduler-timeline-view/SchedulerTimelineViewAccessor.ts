// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-timeline-view` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-timeline-view',
    properties: [
        'appearance',
        'blackoutDates',
        'changed',
        'collectedEvents',
        'connected',
        'controlValue',
        'currentTime',
        'dayFormat',
        'days',
        'dir',
        'disabled',
        'disconnected',
        'eventLayout',
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
        'renderedEventBars',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
        'selectAllow',
        'showWeekNumbers',
        'size',
        'specialDates',
        'startDate',
        'stepMinutes',
        'themeName',
        'timeFormat',
        'timelineScale',
        'timelineSlotWidth',
        'timezone',
        'variant',
        'view',
        'visibleDates',
        'weekdayFormat',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'renderedEventBars',
        'schedulerBeforeEventActivate',
        'schedulerBeforeSelectRange',
        'schedulerEventActivate',
        'schedulerSelectRange',
        'view',
        'visibleDates',
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
export class SchedulerTimelineViewAccessor extends ElementAccessor {}
