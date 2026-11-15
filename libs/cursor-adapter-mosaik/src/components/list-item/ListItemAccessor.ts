// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-list-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-list-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'density',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'displayText',
        'expandable',
        'expanded',
        'index',
        'isChecked',
        'isFocused',
        'isSelected',
        'key',
        'lang',
        'parent',
        'pinned',
        'ripple',
        'selected',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'displayText',
        'index',
        'parent',
        'selected',
    ],
    methods: [
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
        'requestUpdate',
        'select',
        'toggle',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class ListItemAccessor extends ElementAccessor {}
