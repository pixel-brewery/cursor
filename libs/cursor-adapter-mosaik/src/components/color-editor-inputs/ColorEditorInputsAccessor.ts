// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor-inputs` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor-inputs',
    properties: [
        'changed',
        'color',
        'colorChanged',
        'colorFormatChanged',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'format',
        'intl',
        'isFocused',
        'lang',
        'showAlpha',
        'size',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'colorChanged',
        'colorFormatChanged',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'nextFormat',
        'off',
        'on',
        'previousFormat',
        'requestUpdate',
    ],
    events: [
        'changed',
        'colorChanged',
        'colorFormatChanged',
        'connected',
        'disconnected',
    ],
})
export class ColorEditorInputsAccessor extends ElementAccessor {}
