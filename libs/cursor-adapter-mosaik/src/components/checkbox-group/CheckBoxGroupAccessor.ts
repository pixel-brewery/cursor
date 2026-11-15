// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-checkbox-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-checkbox-group',
    properties: [
        'appearance',
        'changed',
        'checkChanged',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'invalid',
        'lang',
        'name',
        'orientation',
        'required',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'checkChanged',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'checkAll',
        'checkValidity',
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
        'uncheckAll',
    ],
    events: ['changed', 'checkChanged', 'connected', 'disconnected'],
})
export class CheckBoxGroupAccessor extends ElementAccessor {}
