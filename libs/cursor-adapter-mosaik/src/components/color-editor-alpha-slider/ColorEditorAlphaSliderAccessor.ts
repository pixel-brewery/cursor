// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-editor-alpha-slider` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-editor-alpha-slider',
    properties: [
        'alpha',
        'alphaChanged',
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'intl',
        'isFocused',
        'lang',
        'step',
        'themeName',
    ],
    readOnlyProperties: [
        'alphaChanged',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['alphaChanged', 'changed', 'connected', 'disconnected'],
})
export class ColorEditorAlphaSliderAccessor extends ElementAccessor {}
