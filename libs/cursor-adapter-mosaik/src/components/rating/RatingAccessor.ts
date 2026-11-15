// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-rating` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-rating',
    properties: [
        'activeSymbol',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'hoverValue',
        'isHovering',
        'label',
        'lang',
        'length',
        'orientation',
        'precision',
        'readonly',
        'size',
        'symbol',
        'symbolAccessor',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'blur',
        'emit',
        'focus',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['change', 'changed', 'connected', 'disconnected'],
})
export class RatingAccessor extends ElementAccessor {}
