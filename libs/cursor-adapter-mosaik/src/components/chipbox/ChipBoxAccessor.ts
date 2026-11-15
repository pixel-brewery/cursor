// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chipbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chipbox',
    properties: [
        'appearance',
        'autocomplete',
        'autofocus',
        'changed',
        'chipAdded',
        'chipRemoved',
        'chips',
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
        'isClearable',
        'isEditable',
        'isFocused',
        'label',
        'lang',
        'name',
        'parser',
        'pattern',
        'placeholder',
        'pressBackspaceToRemove',
        'readonly',
        'required',
        'separatorKeys',
        'size',
        'state',
        'themeName',
        'transform',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'chipAdded',
        'chipRemoved',
        'cleared',
        'connected',
        'controlValue',
        'disconnected',
        'hasPrefix',
        'hasSuffix',
        'state',
    ],
    methods: [
        'add',
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'blur',
        'checkValidity',
        'clear',
        'delete',
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
    ],
    events: [
        'blur',
        'change',
        'changed',
        'chipAdded',
        'chipRemoved',
        'cleared',
        'connected',
        'disconnected',
        'focus',
        'input',
    ],
})
export class ChipBoxAccessor extends ElementAccessor {}
