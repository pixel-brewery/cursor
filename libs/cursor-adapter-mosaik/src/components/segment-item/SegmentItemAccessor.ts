// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment-item',
    properties: [
        'appearance',
        'changed',
        'checked',
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
        'isChecked',
        'isFocused',
        'label',
        'lang',
        'orientation',
        'ripple',
        'size',
        'themeName',
        'toggled',
        'type',
        'unchecked',
        'value',
        'variant',
        'verticalContentAlignment',
    ],
    readOnlyProperties: [
        'changed',
        'checked',
        'connected',
        'controlValue',
        'disconnected',
        'toggled',
        'unchecked',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'check',
        'emit',
        'focus',
        'off',
        'on',
        'requestUpdate',
        'toggle',
        'uncheck',
    ],
    events: ['changed', 'checked', 'connected', 'disconnected', 'toggled', 'unchecked'],
})
export class SegmentItemAccessor extends ElementAccessor {}
