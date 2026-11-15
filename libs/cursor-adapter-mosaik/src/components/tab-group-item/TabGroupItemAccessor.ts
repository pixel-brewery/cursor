// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab-group-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab-group-item',
    properties: [
        'accentColor',
        'changed',
        'collapsed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'items',
        'label',
        'lang',
        'metadata',
        'value',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'items',
    ],
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
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class TabGroupItemAccessor extends ElementAccessor {}
