// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-orbit` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-orbit',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dashed',
        'dir',
        'disconnected',
        'duration',
        'fanOut',
        'lang',
        'motionState',
        'radius',
        'reverse',
        'ringDurations',
        'ringReverse',
        'rings',
        'startAngle',
        'steps',
        'themeName',
        'upright',
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
export class OrbitAccessor extends ElementAccessor {}
