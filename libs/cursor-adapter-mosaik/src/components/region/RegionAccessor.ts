// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-region` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-region',
    properties: [
        'active',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'activate',
        'addEventListener',
        'adoptStyle',
        'emit',
        'firstUpdated',
        'off',
        'on',
        'requestUpdate',
        'updated',
    ],
    events: ['activeChanged', 'changed', 'connected', 'disconnected'],
})
export class RegionAccessor extends ElementAccessor {}
