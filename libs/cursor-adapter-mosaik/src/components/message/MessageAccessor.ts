// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-message` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-message',
    properties: [
        'animationTarget',
        'appearance',
        'changed',
        'closeable',
        'closed',
        'collapsed',
        'connected',
        'content',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'enter',
        'exit',
        'expandable',
        'expanded',
        'fit',
        'formatter',
        'header',
        'icon',
        'iconSize',
        'isExpanded',
        'lang',
        'themeName',
        'toggled',
        'variant',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'closed',
        'collapsed',
        'connected',
        'controlValue',
        'disconnected',
        'expanded',
        'toggled',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'close',
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
        'play',
        'requestUpdate',
        'toggle',
    ],
    events: [
        'changed',
        'closed',
        'collapsed',
        'connected',
        'disconnected',
        'expanded',
        'toggled',
    ],
})
export class MessageAccessor extends ElementAccessor {}
