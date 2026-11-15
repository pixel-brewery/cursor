// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab-strip` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab-strip',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'groups',
        'hasIndicator',
        'horizontalContentAlignment',
        'items',
        'lang',
        'placement',
        'reorderable',
        'selectedIndex',
        'selectedItem',
        'themeName',
        'variant',
        'wrap',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'groups',
        'items',
        'selectedIndex',
        'selectedItem',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'focusByValue',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
        'revealByValue',
        'select',
        'selectByIndex',
        'selectByValue',
    ],
    events: [
        'changed',
        'connected',
        'contextRequested',
        'disconnected',
        'groupToggleRequested',
        'tabMoveRequested',
        'tabSelectionRequested',
    ],
})
export class TabStripAccessor extends ElementAccessor {}
