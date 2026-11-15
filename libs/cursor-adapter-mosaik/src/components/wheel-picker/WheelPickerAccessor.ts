// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-wheel-picker` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-wheel-picker',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'items',
        'lang',
        'themeName',
        'value',
        'variant',
        'wheelPickerChange',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'wheelPickerChange',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'scrollToSelected',
    ],
    events: ['changed', 'connected', 'disconnected', 'wheelPickerChange'],
})
export class WheelPickerAccessor extends ElementAccessor {}
