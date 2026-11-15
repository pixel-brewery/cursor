// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-dialog` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-dialog',
    properties: [
        'animationTarget',
        'appearance',
        'attention',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'dragging',
        'elevation',
        'enter',
        'exit',
        'hasBackdrop',
        'height',
        'isDraggable',
        'isFullScreen',
        'isOpen',
        'lang',
        'offsetX',
        'offsetY',
        'opened',
        'pressEscapeToClose',
        'themeName',
        'width',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'dragging',
        'offsetX',
        'offsetY',
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
        'play',
        'requestAttention',
        'requestUpdate',
    ],
    events: [
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'disconnected',
        'opened',
    ],
})
export class DialogAccessor extends ElementAccessor {}
