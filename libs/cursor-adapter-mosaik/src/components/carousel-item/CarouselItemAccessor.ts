// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-carousel-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-carousel-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'dismissDirection',
        'displayText',
        'index',
        'isActive',
        'isDismissed',
        'isSelected',
        'lang',
        'parent',
        'selected',
        'themeName',
        'timeout',
        'value',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'displayText',
        'index',
        'parent',
        'selected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'deselect',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class CarouselItemAccessor extends ElementAccessor {}
