// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chip-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chip-group',
    properties: [
        'appearance',
        'changed',
        'chipChanged',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'invalid',
        'lang',
        'name',
        'required',
        'selectionMode',
        'size',
        'themeName',
        'value',
        'variant',
        'wrap',
    ],
    readOnlyProperties: [
        'changed',
        'chipChanged',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'checkValidity',
        'deselectAll',
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
        'reset',
        'selectAll',
    ],
    events: ['changed', 'chipChanged', 'connected', 'disconnected'],
})
export class ChipGroupAccessor extends ElementAccessor {}
