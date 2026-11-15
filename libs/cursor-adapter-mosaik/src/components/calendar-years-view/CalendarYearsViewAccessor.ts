// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-calendar-years-view` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-calendar-years-view',
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
        'intl',
        'lang',
        'locale',
        'markerHandler',
        'maxDate',
        'minDate',
        'selection',
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
        'valueChanged',
        'viewChanged',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: [
        'changed',
        'connected',
        'disconnected',
        'displayChanged',
        'valueChanged',
        'viewChanged',
    ],
})
export class CalendarYearsViewAccessor extends ElementAccessor {}
