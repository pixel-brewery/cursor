// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-pinbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-pinbox',
    properties: [
        'appearance',
        'autocomplete',
        'autofocus',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'invalid',
        'isFocused',
        'lang',
        'length',
        'mode',
        'name',
        'parser',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'size',
        'state',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'state',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'blur',
        'checkValidity',
        'clear',
        'emit',
        'focus',
        'off',
        'on',
        'requestUpdate',
        'reset',
    ],
    events: [
        'blur',
        'change',
        'changed',
        'connected',
        'disconnected',
        'focus',
        'input',
    ],
})
export class PinBoxAccessor extends ElementAccessor {}
