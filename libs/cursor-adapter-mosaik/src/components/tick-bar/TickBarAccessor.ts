// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tick-bar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tick-bar',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'interval',
        'labelAccessor',
        'labelPosition',
        'lang',
        'max',
        'min',
        'orientation',
        'showLabels',
        'themeName',
        'ticks',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'ticks',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TickBarAccessor extends ElementAccessor {}
