// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scale` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scale',
    properties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'duration',
        'factor',
        'for',
        'lang',
        'mode',
        'themeName',
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
        'onApplyTemplate',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ScaleAccessor extends ElementAccessor {}
