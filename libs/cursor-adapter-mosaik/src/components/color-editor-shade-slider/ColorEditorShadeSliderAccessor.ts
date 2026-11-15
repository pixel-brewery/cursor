// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor-shade-slider` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor-shade-slider',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'hue',
        'intl',
        'isFocused',
        'lang',
        'saturation',
        'shade',
        'shadeChanged',
        'step',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'shadeChanged',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'shadeChanged'],
})
export class ColorEditorShadeSliderAccessor extends ElementAccessor {}
