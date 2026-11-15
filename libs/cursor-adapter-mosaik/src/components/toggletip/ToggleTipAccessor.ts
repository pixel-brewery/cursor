// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-toggletip` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-toggletip',
    properties: [
        'changed',
        'connected',
        'content',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'height',
        'hideDelay',
        'horizontalOffset',
        'isOpen',
        'lang',
        'placement',
        'showDelay',
        'size',
        'staysOpen',
        'themeName',
        'trigger',
        'verticalOffset',
        'width',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'emit',
        'off',
        'on',
        'open',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ToggleTipAccessor extends ElementAccessor {}
