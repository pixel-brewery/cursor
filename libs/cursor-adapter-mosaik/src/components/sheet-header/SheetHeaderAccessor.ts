// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-sheet-header` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-sheet-header',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'lang',
        'subText',
        'text',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onApplyTemplate',
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class SheetHeaderAccessor extends ElementAccessor {}
