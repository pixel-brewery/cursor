// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-page-header` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-page-header',
    properties: [
        'additionalText',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'inset',
        'lang',
        'subText',
        'text',
        'themeName',
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
export class PageHeaderAccessor extends ElementAccessor {}
