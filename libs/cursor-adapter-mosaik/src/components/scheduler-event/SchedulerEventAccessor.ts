// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-event` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-event',
    properties: [
        'allDay',
        'appearance',
        'changed',
        'connected',
        'contentTemplate',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'draggable',
        'end',
        'eventKey',
        'isFocused',
        'lang',
        'pinned',
        'popupBoundary',
        'popupTemplate',
        'resizable',
        'resizeEdges',
        'resourceIds',
        'ripple',
        'schedulerEventChange',
        'selectable',
        'start',
        'status',
        'themeName',
        'value',
        'variant',
        'view',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'popupBoundary',
        'schedulerEventChange',
        'view',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'schedulerEventChange'],
})
export class SchedulerEventAccessor extends ElementAccessor {}
