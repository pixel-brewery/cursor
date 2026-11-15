// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-checkbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-checkbox',
    properties: [
        'appearance',
        'changed',
        'checked',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'indeterminate',
        'invalid',
        'isChecked',
        'isFocused',
        'isThreeState',
        'label',
        'labelPosition',
        'lang',
        'name',
        'required',
        'themeName',
        'unchecked',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'checked',
        'connected',
        'controlValue',
        'disconnected',
        'indeterminate',
        'unchecked',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'check',
        'checkValidity',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'reset',
        'toggle',
        'uncheck',
    ],
    events: [
        'changed',
        'checked',
        'connected',
        'disconnected',
        'indeterminate',
        'unchecked',
    ],
})
export class CheckboxAccessor extends ElementAccessor {}
