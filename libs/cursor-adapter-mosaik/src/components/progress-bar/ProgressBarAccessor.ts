// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-progress-bar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-progress-bar',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'isIndeterminate',
        'label',
        'lang',
        'max',
        'min',
        'orientation',
        'rangeValueChanged',
        'segments',
        'showLabel',
        'showMarker',
        'themeName',
        'thickness',
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
export class ProgressBarAccessor extends ElementAccessor {}
