// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-calendar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-calendar',
    properties: [
        'allowedViews',
        'appearance',
        'blackoutDates',
        'changed',
        'connected',
        'controlValue',
        'dateChanged',
        'dir',
        'disabled',
        'disconnected',
        'displayChanged',
        'displayDate',
        'displayDateEnd',
        'displayDateStart',
        'firstDayOfWeek',
        'fit',
        'intl',
        'invalid',
        'isTodayHighlighted',
        'isWeekendHighlighted',
        'lang',
        'locale',
        'markerHandler',
        'maxDate',
        'minDate',
        'orientation',
        'selectionMode',
        'sheets',
        'showAdjacent',
        'showNavigation',
        'showWeekNumbers',
        'specialDates',
        'themeName',
        'value',
        'values',
        'variant',
        'view',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'dateChanged',
        'disconnected',
        'displayChanged',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'checkValidity',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'navigateNext',
        'navigatePrevious',
        'navigateToday',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
        'reset',
    ],
    events: ['changed', 'connected', 'dateChanged', 'disconnected', 'displayChanged'],
})
export class CalendarAccessor extends ElementAccessor {}
