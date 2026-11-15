// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-repeat-button` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-repeat-button',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'delay',
        'dir',
        'disabled',
        'disconnected',
        'fit',
        'horizontalContentAlignment',
        'icon',
        'iconPosition',
        'iconSize',
        'interval',
        'isBusy',
        'isFocused',
        'isRepeating',
        'label',
        'lang',
        'orientation',
        'repeated',
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
        'isRepeating',
        'repeated',
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
    events: ['changed', 'connected', 'disconnected', 'repeated'],
})
export class RepeatButtonAccessor extends ElementAccessor {}
