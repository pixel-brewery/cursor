// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scrub-slider` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scrub-slider',
    properties: [
        'accelerate',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'invalid',
        'isFocused',
        'lang',
        'max',
        'min',
        'orientation',
        'pxPerStep',
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
    ],
    events: [
        'change',
        'changed',
        'connected',
        'disconnected',
        'input',
        'rangeValueChanged',
    ],
})
export class ScrubSliderAccessor extends ElementAccessor {}
