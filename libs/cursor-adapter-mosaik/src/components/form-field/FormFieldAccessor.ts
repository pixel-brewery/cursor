// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-form-field` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-form-field',
    properties: [
        'accessor',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'error',
        'form',
        'hint',
        'info',
        'internals',
        'invalid',
        'label',
        'labels',
        'lang',
        'name',
        'required',
        'themeName',
        'validationMessage',
        'validators',
        'validity',
        'willValidate',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'internals',
        'invalid',
        'labels',
        'validationMessage',
        'validity',
        'willValidate',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'checkValidity',
        'emit',
        'formAssociatedCallback',
        'formDisabledCallback',
        'formResetCallback',
        'formStateRestoreCallback',
        'getFormState',
        'getFormValue',
        'off',
        'on',
        'reportValidity',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'invalid'],
})
export class FormFieldAccessor extends ElementAccessor {}
