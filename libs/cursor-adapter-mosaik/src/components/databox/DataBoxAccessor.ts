// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-databox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-databox',
    properties: [
        'appearance',
        'autofocus',
        'browseIcon',
        'browseRequested',
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
        'label',
        'lang',
        'name',
        'parser',
        'placeholder',
        'readonly',
        'required',
        'size',
        'state',
        'textAccessor',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'browseRequested',
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
        'browse',
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
    events: ['browseRequested', 'changed', 'cleared', 'connected', 'disconnected'],
})
export class DataBoxAccessor extends ElementAccessor {}
