// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-portal-projection` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-portal-projection',
    properties: [
        'attention',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'hasBackdrop',
        'isOpen',
        'lang',
        'opened',
        'portal',
        'pressEscapeToClose',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'opened',
        'portal',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assign',
        'assignToSlot',
        'close',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'open',
        'requestAttention',
        'requestUpdate',
    ],
    events: [
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'disconnected',
        'opened',
    ],
})
export class PortalProjectionAccessor extends ElementAccessor {}
