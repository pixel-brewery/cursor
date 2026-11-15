// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-card` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-card',
    properties: [
        'appearance',
        'changed',
        'connected',
        'content',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'elevation',
        'fit',
        'formatter',
        'header',
        'inlineMedia',
        'inset',
        'isSelected',
        'lang',
        'orientation',
        'selected',
        'subHeader',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
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
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class CardAccessor extends ElementAccessor {}
