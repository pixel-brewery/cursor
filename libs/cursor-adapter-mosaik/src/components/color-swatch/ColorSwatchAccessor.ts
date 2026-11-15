// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-swatch` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-swatch',
    properties: [
        'appearance',
        'changed',
        'checked',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'hasBackground',
        'isChecked',
        'lang',
        'name',
        'readonly',
        'size',
        'themeName',
        'toggled',
        'unchecked',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'checked',
        'connected',
        'controlValue',
        'disconnected',
        'toggled',
        'unchecked',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'check',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'toggle',
        'uncheck',
    ],
    events: ['changed', 'checked', 'connected', 'disconnected', 'toggled', 'unchecked'],
})
export class ColorSwatchAccessor extends ElementAccessor {}
