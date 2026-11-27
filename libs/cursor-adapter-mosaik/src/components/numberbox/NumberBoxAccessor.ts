// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-numberbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-numberbox',
    properties: [
        'appearance',
        'autocomplete',
        'autofocus',
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'decimalPlaces',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'hasInvalidInput',
        'hasPrefix',
        'hasSuffix',
        'intl',
        'invalid',
        'isBusy',
        'isClearable',
        'isFocused',
        'keyboard',
        'label',
        'lang',
        'max',
        'min',
        'name',
        'parser',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'size',
        'spinPosition',
        'spinner',
        'state',
        'step',
        'textAlign',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'disconnected',
        'hasInvalidInput',
        'hasPrefix',
        'hasSuffix',
        'state',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'blur',
        'checkValidity',
        'clear',
        'emit',
        'focus',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
        'reset',
        'select',
    ],
    events: [
        'blur',
        'change',
        'changed',
        'cleared',
        'connected',
        'disconnected',
        'focus',
        'input',
    ],
})
export class NumberBoxAccessor extends ElementAccessor {}
