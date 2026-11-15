// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-filebox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-filebox',
    properties: [
        'accept',
        'appearance',
        'autofocus',
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'dir',
        'directory',
        'disabled',
        'disconnected',
        'files',
        'filesSelected',
        'formatter',
        'hasPrefix',
        'hasSuffix',
        'intl',
        'invalid',
        'isClearable',
        'isFocused',
        'label',
        'lang',
        'multiple',
        'name',
        'parser',
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
        'cleared',
        'connected',
        'controlValue',
        'disconnected',
        'filesSelected',
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
    events: ['changed', 'cleared', 'connected', 'disconnected', 'filesSelected'],
})
export class FileBoxAccessor extends ElementAccessor {}
