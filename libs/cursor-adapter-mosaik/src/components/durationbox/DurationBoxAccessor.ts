// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-durationbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-durationbox',
    properties: [
        'appearance',
        'autofocus',
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'hasLabel',
        'hasPrefix',
        'hasSuffix',
        'hours',
        'intl',
        'invalid',
        'isClearable',
        'isFocused',
        'label',
        'lang',
        'minutes',
        'name',
        'parser',
        'placeholder',
        'readonly',
        'required',
        'seconds',
        'size',
        'state',
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
        'hasLabel',
        'hasPrefix',
        'hasSuffix',
        'hours',
        'minutes',
        'seconds',
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
export class DurationBoxAccessor extends ElementAccessor {}
