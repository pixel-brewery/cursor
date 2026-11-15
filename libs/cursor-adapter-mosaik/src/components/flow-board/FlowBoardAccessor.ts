// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board',
    properties: [
        'boardKey',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'displayMode',
        'dragGroup',
        'dragdrop',
        'dropPredicate',
        'filterPredicate',
        'gap',
        'intl',
        'isFocused',
        'lang',
        'mutationMode',
        'orientation',
        'selectedItemKeys',
        'selectedItems',
        'selectedValues',
        'selectionMode',
        'showScrollButtons',
        'showScrollbar',
        'sortComparator',
        'stacked',
        'themeName',
        'virtualized',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'selectedItemKeys',
        'selectedItems',
        'selectedValues',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'clearSelection',
        'emit',
        'getColumnByKey',
        'getColumnGroups',
        'getColumns',
        'getScrollableElement',
        'getSelectableItems',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'getSwimlaneByKey',
        'getSwimlanes',
        'hasSlot',
        'hasSlotContent',
        'moveItem',
        'moveItems',
        'off',
        'on',
        'onSlotChanges',
        'refreshView',
        'reorderColumn',
        'requestUpdate',
        'selectAll',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'flowBoardBeforeColumnReorder',
        'flowBoardBeforeItemGroup',
        'flowBoardBeforeItemMove',
        'flowBoardBeforeItemReorder',
        'flowBoardBeforeItemsMove',
        'flowBoardColumnReorder',
        'flowBoardDragEnd',
        'flowBoardDragStart',
        'flowBoardItemDropBlocked',
        'flowBoardItemGroup',
        'flowBoardItemMove',
        'flowBoardItemReorder',
        'flowBoardItemsMove',
        'flowBoardSelectionChanged',
    ],
})
export class FlowBoardAccessor extends ElementAccessor {}
