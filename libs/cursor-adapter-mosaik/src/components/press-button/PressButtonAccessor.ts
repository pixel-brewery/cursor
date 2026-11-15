// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-press-button` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-press-button',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'duration',
        'fit',
        'horizontalContentAlignment',
        'icon',
        'iconPosition',
        'iconSize',
        'isBusy',
        'isFocused',
        'isPressing',
        'label',
        'lang',
        'orientation',
        'pressed',
        'reverse',
        'ripple',
        'size',
        'themeName',
        'type',
        'value',
        'variant',
        'verticalContentAlignment',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isPressing',
        'pressed',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'focus',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'pressed'],
})
export class PressButtonAccessor extends ElementAccessor {}
