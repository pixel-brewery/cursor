// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-slider` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-slider',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'invalid',
        'isFocused',
        'label',
        'lang',
        'max',
        'min',
        'orientation',
        'rangeValueChanged',
        'showTickLabels',
        'step',
        'themeName',
        'tickLabelAccessor',
        'tickPlacement',
        'ticks',
        'tooltipAccessor',
        'tooltipPlacement',
        'track',
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
    methods: [
        'addEventListener',
        'adoptStyle',
        'checkValidity',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'stepDown',
        'stepUp',
    ],
    events: ['changed', 'connected', 'disconnected', 'rangeValueChanged'],
})
export class SliderAccessor extends ElementAccessor {}
