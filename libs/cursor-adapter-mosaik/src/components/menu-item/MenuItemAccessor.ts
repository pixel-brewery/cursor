// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-menu-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-menu-item',
    properties: [
        'activated',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'hasCheckmark',
        'hasChildren',
        'hasIcon',
        'icon',
        'isActive',
        'isChecked',
        'isExpanded',
        'isFocused',
        'label',
        'lang',
        'menuMode',
        'ripple',
        'size',
        'subLabel',
        'textOverflow',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'activated',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasCheckmark',
        'hasChildren',
        'hasIcon',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'collapse',
        'emit',
        'expand',
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
    ],
    events: ['activated', 'changed', 'connected', 'disconnected'],
})
export class MenuItemAccessor extends ElementAccessor {}
