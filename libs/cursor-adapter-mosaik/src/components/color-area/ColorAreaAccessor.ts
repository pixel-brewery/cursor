// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-area` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-area',
    properties: [
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'isFocused',
        'lang',
        'step',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['change', 'changed', 'connected', 'disconnected', 'input'],
})
export class ColorAreaAccessor extends ElementAccessor {}
