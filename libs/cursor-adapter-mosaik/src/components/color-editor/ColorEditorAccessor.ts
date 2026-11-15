// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor',
    properties: [
        'alpha',
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
        'hue',
        'intl',
        'isFocused',
        'lang',
        'paletteChanged',
        'palettes',
        'saturation',
        'selectedPalette',
        'showAlpha',
        'showEyeDropper',
        'showInputs',
        'showPalette',
        'showSwatch',
        'themeName',
        'value',
    ],
    readOnlyProperties: [
        'alpha',
        'changed',
        'colorChanged',
        'colorFormatChanged',
        'connected',
        'controlValue',
        'disconnected',
        'hue',
        'paletteChanged',
        'saturation',
        'value',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: [
        'changed',
        'colorChanged',
        'colorFormatChanged',
        'connected',
        'disconnected',
        'paletteChanged',
    ],
})
export class ColorEditorAccessor extends ElementAccessor {}
