// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-chart-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-chart-group',
    properties: [
        'alignPlots',
        'changed',
        'charts',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'sync',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'charts',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class ChartGroupAccessor extends ElementAccessor {}
