// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-wizard` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-wizard',
    properties: [
        'activeIndex',
        'activeStepChanged',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'fit',
        'hasItems',
        'isFirstStep',
        'isLastStep',
        'items',
        'itemsChanged',
        'lang',
        'name',
        'selectedIndex',
        'selectedItem',
        'selectionChanged',
        'themeName',
    ],
    readOnlyProperties: [
        'activeIndex',
        'activeStepChanged',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasItems',
        'isFirstStep',
        'isLastStep',
        'items',
        'itemsChanged',
        'selectedIndex',
        'selectedItem',
        'selectionChanged',
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
        'requestUpdate',
        'resetSelection',
        'select',
        'selectFirst',
        'selectLast',
        'selectNext',
        'selectPrevious',
    ],
    events: [
        'activeStepChanged',
        'changed',
        'connected',
        'disconnected',
        'itemsChanged',
        'selectionChanged',
    ],
})
export class WizardAccessor extends ElementAccessor {}
