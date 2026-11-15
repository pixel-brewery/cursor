// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board-swimlane` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board-swimlane',
    properties: [
        'changed',
        'collapsed',
        'collapsible',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'expanded',
        'intl',
        'isCollapsed',
        'isExpanded',
        'itemCount',
        'lang',
        'readableLabel',
        'showItemCount',
        'swimlaneKey',
        'themeName',
        'toggled',
    ],
    readOnlyProperties: [
        'changed',
        'collapsed',
        'connected',
        'controlValue',
        'disconnected',
        'expanded',
        'intl',
        'isCollapsed',
        'itemCount',
        'readableLabel',
        'toggled',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'collapse',
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
        'requestUpdate',
        'toggle',
    ],
    events: [
        'changed',
        'collapsed',
        'connected',
        'disconnected',
        'expanded',
        'flowBoardBeforeSwimlaneExpandChange',
        'flowBoardSwimlaneExpandChange',
        'toggled',
    ],
})
export class FlowBoardSwimlaneAccessor extends ElementAccessor {}
