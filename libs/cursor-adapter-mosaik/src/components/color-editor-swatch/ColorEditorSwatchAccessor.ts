// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor-swatch` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor-swatch',
    properties: [
        'changed',
        'color',
        'connected',
        'controlValue',
        'copyable',
        'dir',
        'disabled',
        'disconnected',
        'intl',
        'isFocused',
        'lang',
        'swatchCopy',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'swatchCopy',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'pick',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'swatchCopy'],
})
export class ColorEditorSwatchAccessor extends ElementAccessor {}
