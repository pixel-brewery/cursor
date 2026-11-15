// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-updown-spinner` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-updown-spinner',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'decreaseDisabled',
        'decreaseIcon',
        'delay',
        'dir',
        'disabled',
        'disconnected',
        'focusable',
        'increaseDisabled',
        'increaseIcon',
        'interval',
        'intl',
        'lang',
        'orientation',
        'position',
        'size',
        'spinned',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'spinned',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'spinned'],
})
export class UpDownSpinnerAccessor extends ElementAccessor {}
