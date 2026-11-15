// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-choice-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-choice-group',
    properties: [
        'appearance',
        'changed',
        'choiceChanged',
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
        'choiceChanged',
        'connected',
        'controlValue',
        'disconnected',
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
    events: ['changed', 'choiceChanged', 'connected', 'disconnected'],
})
export class ChoiceGroupAccessor extends ElementAccessor {}
