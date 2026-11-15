// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-fab` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-fab',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'icon',
        'iconPosition',
        'iconSize',
        'isBusy',
        'isFocused',
        'label',
        'lang',
        'ripple',
        'size',
        'themeName',
        'type',
        'value',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'focus',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class FloatingActionButtonAccessor extends ElementAccessor {}
