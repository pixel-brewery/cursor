// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-back-top` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-back-top',
    properties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'dir',
        'disconnected',
        'for',
        'lang',
        'offset',
        'position',
        'restored',
        'themeName',
        'to',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'disconnected',
        'position',
        'restored',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'attach',
        'detach',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'restored'],
})
export class BackTopAccessor extends ElementAccessor {}
