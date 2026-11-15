// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-card-title` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-card-title',
    properties: [
        'changed',
        'connected',
        'contentChanged',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'hasContent',
        'lang',
        'text',
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
export class CardTitleAccessor extends ElementAccessor {}
