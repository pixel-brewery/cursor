// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chat-prompt-box-queue` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chat-prompt-box-queue',
    properties: [
        'actions',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'editable',
        'entries',
        'intl',
        'lang',
        'pausable',
        'reorderable',
        'steerable',
        'themeName',
        'variant',
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
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChatPromptBoxQueueAccessor extends ElementAccessor {}
