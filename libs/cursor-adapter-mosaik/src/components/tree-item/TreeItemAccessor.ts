// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tree-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tree-item',
    properties: [
        'changed',
        'childItems',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'displayText',
        'hasChildren',
        'index',
        'isBusy',
        'isChecked',
        'isExpanded',
        'isFocused',
        'isIndeterminate',
        'isLazy',
        'isSelected',
        'items',
        'key',
        'lang',
        'parent',
        'selected',
        'text',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'childItems',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'displayText',
        'index',
        'isLazy',
        'items',
        'parent',
        'selected',
    ],
    methods: [
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
        'requestUpdate',
        'select',
        'toggle',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class TreeItemAccessor extends ElementAccessor {}
