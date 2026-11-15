// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-stepper-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-stepper-item',
    properties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'description',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'displayText',
        'enter',
        'exit',
        'header',
        'hint',
        'icon',
        'iconSize',
        'index',
        'isActive',
        'isSelected',
        'lang',
        'parent',
        'selected',
        'state',
        'themeName',
        'value',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'displayText',
        'index',
        'parent',
        'selected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'deselect',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'play',
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class StepperItemAccessor extends ElementAccessor {}
