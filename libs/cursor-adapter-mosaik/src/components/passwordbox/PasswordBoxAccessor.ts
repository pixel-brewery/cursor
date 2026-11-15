// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-passwordbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-passwordbox',
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
        'isClearable',
        'isFocused',
        'isReveal',
        'label',
        'lang',
        'name',
        'parser',
        'passwordConcealed',
        'passwordRevealed',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'revealable',
        'size',
        'state',
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
        'hasPrefix',
        'hasSuffix',
        'passwordConcealed',
        'passwordRevealed',
        'state',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'blur',
        'checkValidity',
        'clear',
        'conceal',
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
        'reveal',
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
        'passwordConcealed',
        'passwordRevealed',
    ],
})
export class PasswordBoxAccessor extends ElementAccessor {}
