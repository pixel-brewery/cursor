// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab-strip-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab-strip-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'icon',
        'iconPosition',
        'iconSize',
        'isFocused',
        'isSelected',
        'label',
        'lang',
        'orientation',
        'parent',
        'placement',
        'ripple',
        'selected',
        'size',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'parent',
        'placement',
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
export class TabStripItemAccessor extends ElementAccessor {}
