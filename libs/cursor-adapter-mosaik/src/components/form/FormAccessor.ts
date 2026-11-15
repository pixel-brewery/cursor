// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-form` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-form',
    properties: [
        'autocomplete',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'name',
        'novalidate',
        'reseted',
        'submitted',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'reseted',
        'submitted',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
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
        'reportValidity',
        'requestUpdate',
        'reset',
        'submit',
    ],
    events: ['changed', 'connected', 'disconnected', 'formReset', 'submitted'],
})
export class FormAccessor extends ElementAccessor {}
