// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab',
    properties: [
        'alignment',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'enableGestures',
        'entries',
        'hasIndicator',
        'items',
        'lang',
        'placement',
        'reorderable',
        'selectedIndex',
        'selectedItem',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'entries',
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
export class TabAccessor extends ElementAccessor {}
