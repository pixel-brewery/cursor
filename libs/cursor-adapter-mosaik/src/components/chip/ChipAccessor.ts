// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chip` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chip',
    properties: [
        'appearance',
        'changed',
        'checked',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'icon',
        'isCheckable',
        'isChecked',
        'isFocused',
        'label',
        'lang',
        'ripple',
        'size',
        'themeName',
        'toggled',
        'unchecked',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'checked',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'toggled',
        'unchecked',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'check',
        'close',
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
        'toggle',
        'uncheck',
    ],
    events: [
        'changed',
        'checked',
        'closed',
        'connected',
        'disconnected',
        'toggled',
        'unchecked',
    ],
})
export class ChipAccessor extends ElementAccessor {}
