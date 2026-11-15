// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab-strip-group-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab-strip-group-item',
    properties: [
        'accentColor',
        'changed',
        'collapsed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'intl',
        'items',
        'label',
        'lang',
        'metadata',
        'themeName',
        'value',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'items',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'focus',
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
export class TabStripGroupItemAccessor extends ElementAccessor {}
