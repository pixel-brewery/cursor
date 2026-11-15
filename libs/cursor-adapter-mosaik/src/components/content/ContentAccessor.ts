// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-content` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-content',
    properties: [
        'changed',
        'connected',
        'contentChanged',
        'controlValue',
        'dir',
        'disconnected',
        'hasContent',
        'lang',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'contentChanged',
        'controlValue',
        'disconnected',
        'hasContent',
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
    events: ['changed', 'connected', 'contentChanged', 'disconnected'],
})
export class ContentAccessor extends ElementAccessor {}
