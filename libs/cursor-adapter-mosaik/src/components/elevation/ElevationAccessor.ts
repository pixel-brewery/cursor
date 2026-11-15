// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-elevation` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-elevation',
    properties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'for',
        'lang',
        'themeName',
        'weigh',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'disconnected',
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
    events: ['changed', 'connected', 'disconnected'],
})
export class ElevationAccessor extends ElementAccessor {}
