// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-marquee` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-marquee',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'fade',
        'lang',
        'motionState',
        'orientation',
        'reverse',
        'speed',
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
        'getCopies',
        'getItems',
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
export class MarqueeAccessor extends ElementAccessor {}
