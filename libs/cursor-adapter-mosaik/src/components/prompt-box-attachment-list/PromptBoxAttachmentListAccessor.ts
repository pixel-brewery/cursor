// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-prompt-box-attachment-list` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-prompt-box-attachment-list',
    properties: [
        'appearance',
        'attachmentRemoved',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'entries',
        'lang',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'attachmentRemoved',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
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
    events: ['attachmentRemove', 'changed', 'connected', 'disconnected'],
})
export class PromptBoxAttachmentListAccessor extends ElementAccessor {}
