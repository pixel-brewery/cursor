// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-illustration` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-illustration',
    properties: [
        'background',
        'changed',
        'connected',
        'controlValue',
        'description',
        'dir',
        'disconnected',
        'frameless',
        'interactive',
        'isometric',
        'label',
        'lang',
        'motion',
        'motionState',
        'paused',
        'ratio',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'motionState',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class IllustrationAccessor extends ElementAccessor {}
