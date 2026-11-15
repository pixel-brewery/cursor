// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-combo-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-combo-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'displayText',
        'icon',
        'index',
        'isActive',
        'isChecked',
        'isFocused',
        'isSelected',
        'label',
        'lang',
        'parent',
        'ripple',
        'selected',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
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
        'deselect',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class ComboItemAccessor extends ElementAccessor {}
