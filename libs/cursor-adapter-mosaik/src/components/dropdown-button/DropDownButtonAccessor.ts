// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-dropdown-button` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-dropdown-button',
    properties: [
        'appearance',
        'caretVisible',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'dropDownDistance',
        'dropDownHeight',
        'dropDownMaxHeight',
        'dropDownMaxWidth',
        'dropDownPlacement',
        'dropDownSkidding',
        'dropDownStaysOpen',
        'dropDownStrategy',
        'dropDownWidth',
        'fit',
        'horizontalContentAlignment',
        'icon',
        'iconPosition',
        'iconSize',
        'isBusy',
        'isDropDownOpen',
        'isFocused',
        'label',
        'lang',
        'orientation',
        'reverse',
        'ripple',
        'size',
        'themeName',
        'type',
        'value',
        'variant',
        'verticalContentAlignment',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'emit',
        'focus',
        'off',
        'on',
        'open',
        'requestUpdate',
        'toggle',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class DropDownButtonAccessor extends ElementAccessor {}
