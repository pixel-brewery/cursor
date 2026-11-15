// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-color-slider` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-color-slider',
    properties: [
        'changed',
        'color',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'lang',
        'orientation',
        'step',
        'themeName',
        'value',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['change', 'changed', 'connected', 'disconnected', 'input'],
})
export class ColorSliderAccessor extends ElementAccessor {}
