// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board-column` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board-column',
    properties: [
        'appearance',
        'changed',
        'collapsed',
        'collapsible',
        'columnKey',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'displayMode',
        'expanded',
        'intl',
        'isExpanded',
        'itemCount',
        'lang',
        'orientation',
        'pinned',
        'reorderable',
        'selectionMode',
        'showItemCount',
        'showScrollButtons',
        'showScrollbar',
        'themeName',
        'toggled',
    ],
    readOnlyProperties: [
        'changed',
        'collapsed',
        'connected',
        'controlValue',
        'disconnected',
        'displayMode',
        'expanded',
        'itemCount',
        'orientation',
        'selectionMode',
        'toggled',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'collapse',
        'emit',
        'expand',
        'getItems',
        'getItemsInSwimlane',
        'getNonPinnedItems',
        'getPinnedItems',
        'getScrollableElement',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
        'setPinned',
        'toggle',
    ],
    events: [
        'changed',
        'collapsed',
        'connected',
        'disconnected',
        'expanded',
        'flowBoardBeforeColumnExpandChange',
        'flowBoardBeforeColumnPinChange',
        'flowBoardColumnExpandChange',
        'flowBoardColumnPinChange',
        'toggled',
    ],
})
export class FlowBoardColumnAccessor extends ElementAccessor {}
