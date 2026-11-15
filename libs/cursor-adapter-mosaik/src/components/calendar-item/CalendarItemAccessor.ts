// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-calendar-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-calendar-item',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'isAdjacent',
        'isBlackout',
        'isFocused',
        'isRangeEnd',
        'isRangeMiddle',
        'isRangePreview',
        'isRangeStart',
        'isSelected',
        'isSpecial',
        'isToday',
        'isWeekend',
        'lang',
        'markers',
        'ripple',
        'text',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'click', 'connected', 'disconnected'],
})
export class CalendarItemAccessor extends ElementAccessor {}
