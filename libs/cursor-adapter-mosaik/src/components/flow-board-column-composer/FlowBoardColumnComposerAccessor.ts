// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-board-column-composer` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-board-column-composer',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'open',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'close',
        'create',
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
        'toggle',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'flowBoardBeforeColumnCreate',
        'flowBoardColumnCreate',
    ],
})
export class FlowBoardColumnComposerAccessor extends ElementAccessor {}
