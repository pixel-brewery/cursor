// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chat` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chat',
    properties: [
        'appearance',
        'begin',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'height',
        'intl',
        'lang',
        'scrollToEnd',
        'scrollToEndThreshold',
        'themeName',
        'variant',
        'width',
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
        'scrollToLatest',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChatAccessor extends ElementAccessor {}
