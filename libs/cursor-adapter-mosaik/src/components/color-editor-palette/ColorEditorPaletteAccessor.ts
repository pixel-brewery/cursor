// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor-palette` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor-palette',
    properties: [
        'allowAdd',
        'changed',
        'connected',
        'controlValue',
        'currentColor',
        'dir',
        'disabled',
        'disconnected',
        'intl',
        'isFocused',
        'lang',
        'paletteAdd',
        'paletteChanged',
        'paletteCustomChanged',
        'paletteSelect',
        'palettes',
        'panelAnchor',
        'panelOpen',
        'selectedPalette',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'paletteAdd',
        'paletteChanged',
        'paletteCustomChanged',
        'paletteSelect',
        'panelOpen',
    ],
    methods: [
        'addColorToCustomPalette',
        'addEventListener',
        'adoptStyle',
        'emit',
        'getCustomPaletteColors',
        'off',
        'on',
        'removeColorFromCustomPalette',
        'requestUpdate',
        'setCustomPaletteColors',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'paletteAdd',
        'paletteChanged',
        'paletteCustomChanged',
        'paletteSelect',
    ],
})
export class ColorEditorPaletteAccessor extends ElementAccessor {}
