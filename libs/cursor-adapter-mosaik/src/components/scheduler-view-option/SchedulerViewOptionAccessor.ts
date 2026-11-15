// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scheduler-view-option` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scheduler-view-option',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'days',
        'dir',
        'disconnected',
        'label',
        'lang',
        'view',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class SchedulerViewOptionAccessor extends ElementAccessor {}
