// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-toggle-button-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-toggle-button-group',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'invalid',
        'lang',
        'orientation',
        'themeName',
        'toggleChanged',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'toggleChanged',
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
        'requestUpdate',
        'reset',
    ],
    events: ['changed', 'connected', 'disconnected', 'groupChanged'],
})
export class ToggleButtonGroupAccessor extends ElementAccessor {}
