// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-compound-button` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-compound-button',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'fit',
        'horizontalContentAlignment',
        'icon',
        'iconPosition',
        'iconSize',
        'isBusy',
        'isFocused',
        'isNavigation',
        'label',
        'lang',
        'orientation',
        'reverse',
        'ripple',
        'size',
        'subLabel',
        'themeName',
        'type',
        'value',
        'variant',
        'verticalContentAlignment',
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
export class CompoundButtonAccessor extends ElementAccessor {}
