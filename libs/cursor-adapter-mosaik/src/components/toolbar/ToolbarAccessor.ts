// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-toolbar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-toolbar',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fit',
        'formatter',
        'lang',
        'subTitle',
        'themeName',
        'title',
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
export class ToolbarAccessor extends ElementAccessor {}
