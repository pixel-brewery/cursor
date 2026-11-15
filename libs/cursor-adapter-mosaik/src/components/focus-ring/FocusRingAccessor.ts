// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-focus-ring` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-focus-ring',
    properties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'controlled',
        'dir',
        'disconnected',
        'for',
        'inward',
        'lang',
        'retained',
        'themeName',
        'variant',
        'visible',
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
export class FocusRingAccessor extends ElementAccessor {}
