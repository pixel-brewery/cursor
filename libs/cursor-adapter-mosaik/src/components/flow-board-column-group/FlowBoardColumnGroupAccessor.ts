// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board-column-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board-column-group',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'groupKey',
        'lang',
        'orientation',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'orientation',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getColumns',
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
export class FlowBoardColumnGroupAccessor extends ElementAccessor {}
