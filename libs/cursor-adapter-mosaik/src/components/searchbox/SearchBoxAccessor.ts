// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-searchbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-searchbox',
    properties: [
        'appearance',
        'autocomplete',
        'autofocus',
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'delay',
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
        'lang',
        'mode',
        'name',
        'parser',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'searched',
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
        'searched',
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
        'search',
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
        'searched',
    ],
})
export class SearchBoxAccessor extends ElementAccessor {}
