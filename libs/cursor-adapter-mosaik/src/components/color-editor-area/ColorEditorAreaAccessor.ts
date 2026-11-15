// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor-area` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor-area',
    properties: [
        'changed',
        'colorAreaChanged',
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
        'themeName',
        'value',
    ],
    readOnlyProperties: [
        'changed',
        'colorAreaChanged',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'setColor',
    ],
    events: ['changed', 'colorAreaChanged', 'connected', 'disconnected'],
})
export class ColorEditorAreaAccessor extends ElementAccessor {}
