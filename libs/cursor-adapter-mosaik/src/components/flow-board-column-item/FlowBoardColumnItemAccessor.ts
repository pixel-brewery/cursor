// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board-column-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board-column-item',
    properties: [
        'appearance',
        'changed',
        'columnKey',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'displayMode',
        'draggable',
        'intl',
        'isFocused',
        'isSelected',
        'itemKey',
        'lang',
        'orientation',
        'pinned',
        'reorderable',
        'ripple',
        'selected',
        'selectionMode',
        'swimlaneKey',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'columnKey',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'displayMode',
        'orientation',
        'selected',
        'selectionMode',
    ],
    methods: [
        'activate',
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'deselect',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'pin',
        'requestUpdate',
        'select',
        'unpin',
    ],
    events: [
        'changed',
        'connected',
        'deselected',
        'disconnected',
        'flowBoardBeforeItemActivate',
        'flowBoardBeforeItemPinChange',
        'flowBoardItemActivate',
        'flowBoardItemPinChange',
        'selected',
    ],
})
export class FlowBoardColumnItemAccessor extends ElementAccessor {}
