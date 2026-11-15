// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-textbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-textbox',
    properties: [
        'appearance',
        'autocomplete',
        'autofocus',
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
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
        'maxlength',
        'minlength',
        'multiline',
        'multilineMaxRows',
        'multilineRows',
        'name',
        'parser',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'resize',
        'size',
        'state',
        'textAlign',
        'themeName',
        'type',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'disconnected',
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
    events: ['changed', 'cleared', 'connected', 'disconnected'],
})
export class TextBoxAccessor extends ElementAccessor {}
