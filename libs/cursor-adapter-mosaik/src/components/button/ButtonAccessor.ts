// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-button` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-button',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'download',
        'fit',
        'horizontalContentAlignment',
        'href',
        'icon',
        'iconPosition',
        'iconSize',
        'isBusy',
        'isFocused',
        'label',
        'lang',
        'orientation',
        'rel',
        'reverse',
        'ripple',
        'size',
        'target',
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
export class ButtonAccessor extends ElementAccessor {}
