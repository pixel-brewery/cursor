// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board-column-item-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board-column-item-group',
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
        'groupKey',
        'intl',
        'isFocused',
        'isSelected',
        'isStackExpanded',
        'itemKey',
        'lang',
        'maxStackDepth',
        'memberItemKeys',
        'orientation',
        'pinned',
        'reorderable',
        'revealTrigger',
        'ripple',
        'rootItemKey',
        'selected',
        'selectionMode',
        'stacking',
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
        'isStackExpanded',
        'memberItemKeys',
        'orientation',
        'selected',
        'selectionMode',
    ],
    methods: [
        'activate',
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'collapse',
        'deselect',
        'emit',
        'expand',
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
        'suppressReveal',
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
export class FlowBoardColumnItemGroupAccessor extends ElementAccessor {}
