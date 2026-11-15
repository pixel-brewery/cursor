// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-message-content` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-message-content',
    properties: [
        'changed',
        'collapsed',
        'collapsedLines',
        'connected',
        'contentChanged',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'expanded',
        'formatter',
        'hasContent',
        'isExpanded',
        'lang',
        'text',
        'themeName',
        'toggled',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'collapsed',
        'connected',
        'contentChanged',
        'controlValue',
        'disconnected',
        'expanded',
        'hasContent',
        'toggled',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'collapse',
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
        'toggle',
    ],
    events: [
        'changed',
        'collapsed',
        'connected',
        'contentChanged',
        'disconnected',
        'expanded',
        'toggled',
    ],
})
export class MessageContentAccessor extends ElementAccessor {}
