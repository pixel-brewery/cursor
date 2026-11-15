// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-calendar-days-view` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-calendar-days-view',
    properties: [
        'allowedViews',
        'appearance',
        'blackoutDates',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'displayChanged',
        'displayDate',
        'displayDateEnd',
        'displayDateStart',
        'firstDayOfWeek',
        'intl',
        'isTodayHighlighted',
        'isWeekendHighlighted',
        'lang',
        'locale',
        'markerHandler',
        'maxDate',
        'minDate',
        'previewDateChange',
        'rangePreviewDate',
        'selection',
        'showAdjacent',
        'showWeekNumbers',
        'specialDates',
        'themeName',
        'value',
        'valueChanged',
        'values',
        'variant',
        'viewChanged',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'displayChanged',
        'previewDateChange',
        'valueChanged',
        'viewChanged',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'isSelected',
        'off',
        'on',
        'requestUpdate',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'displayChanged',
        'previewDateChange',
        'valueChanged',
        'viewChanged',
    ],
})
export class CalendarDaysViewAccessor extends ElementAccessor {}
