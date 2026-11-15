// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-gauge-control` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-gauge-control',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'endAngle',
        'form',
        'gaugePressed',
        'internals',
        'isFocused',
        'knob',
        'label',
        'labels',
        'lang',
        'max',
        'min',
        'name',
        'rangeValueChanged',
        'startAngle',
        'step',
        'themeName',
        'validationMessage',
        'validity',
        'value',
        'valueText',
        'willValidate',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'gaugePressed',
        'internals',
        'labels',
        'rangeValueChanged',
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
    events: [
        'change',
        'changed',
        'connected',
        'disconnected',
        'gaugePressed',
        'input',
        'invalid',
        'rangeValueChanged',
    ],
})
export class GaugeControlAccessor extends ElementAccessor {}
