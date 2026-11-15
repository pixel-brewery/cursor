// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-slider2-thumb` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-slider2-thumb',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'isFocused',
        'lang',
        'max',
        'min',
        'rangeValueChanged',
        'step',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'rangeValueChanged',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class Slider2ThumbAccessor extends ElementAccessor {}
