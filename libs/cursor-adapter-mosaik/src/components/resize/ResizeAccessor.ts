// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-resize` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-resize',
    properties: [
        'active',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'ghostFactory',
        'hasPointer',
        'lang',
        'mode',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasPointer',
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
    events: [
        'changed',
        'connected',
        'disconnected',
        'resizeResizeCanceled',
        'resizeResizeEnded',
        'resizeResizeStarted',
        'resizeResized',
    ],
})
export class ResizeAccessor extends ElementAccessor {}
