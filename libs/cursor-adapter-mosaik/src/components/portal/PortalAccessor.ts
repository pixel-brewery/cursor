// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-portal` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-portal',
    properties: [
        'adoptedStyles',
        'attached',
        'changed',
        'connected',
        'controlValue',
        'destination',
        'detached',
        'dir',
        'disconnected',
        'isActive',
        'isProjected',
        'lang',
        'projection',
    ],
    readOnlyProperties: [
        'attached',
        'changed',
        'connected',
        'controlValue',
        'detached',
        'disconnected',
        'isProjected',
        'projection',
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
    events: [
        'changed',
        'connected',
        'disconnected',
        'portalAttached',
        'portalDetached',
    ],
})
export class PortalAccessor extends ElementAccessor {}
