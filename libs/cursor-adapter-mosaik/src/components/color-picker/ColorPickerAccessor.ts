// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-picker` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-picker',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'dropDownDistance',
        'dropDownHeight',
        'dropDownMaxHeight',
        'dropDownMaxWidth',
        'dropDownPlacement',
        'dropDownSkidding',
        'dropDownStaysOpen',
        'dropDownStrategy',
        'dropDownWidth',
        'format',
        'intl',
        'isDropDownOpen',
        'lang',
        'palettes',
        'selectedPalette',
        'showAlpha',
        'showEyeDropper',
        'showInputs',
        'showPalette',
        'showSwatch',
        'themeName',
        'value',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'emit',
        'off',
        'on',
        'open',
        'requestUpdate',
        'toggle',
    ],
    events: ['changed', 'colorChanged', 'connected', 'disconnected'],
})
export class ColorPickerAccessor extends ElementAccessor {}
