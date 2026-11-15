// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-progress-ring` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-progress-ring',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'isIndeterminate',
        'label',
        'labelPosition',
        'lang',
        'max',
        'min',
        'orientation',
        'percent',
        'radius',
        'rangeValueChanged',
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
        'percent',
        'rangeValueChanged',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class ProgressRingAccessor extends ElementAccessor {}
