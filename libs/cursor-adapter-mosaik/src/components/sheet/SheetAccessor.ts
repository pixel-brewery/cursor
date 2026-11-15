// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-sheet` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-sheet',
    properties: [
        'activeSnapChanged',
        'activeSnapIndex',
        'attention',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeThreshold',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'docked',
        'dragEnd',
        'dragMode',
        'dragStart',
        'dragging',
        'elastic',
        'hasBackdrop',
        'hasHandle',
        'hasSnapIndicator',
        'height',
        'inertia',
        'isModal',
        'isOpen',
        'lang',
        'opened',
        'position',
        'pressEscapeToClose',
        'snaps',
        'themeName',
        'width',
    ],
    readOnlyProperties: [
        'activeSnapChanged',
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'dragEnd',
        'dragStart',
        'dragging',
        'opened',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'close',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'open',
        'requestAttention',
        'requestUpdate',
        'snapTo',
    ],
    events: [
        'activeSnapChanged',
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'disconnected',
        'dragEnd',
        'dragStart',
        'dragging',
        'opened',
    ],
})
export class SheetAccessor extends ElementAccessor {}
