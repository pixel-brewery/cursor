// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-fab-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-fab-group',
    properties: [
        'appearance',
        'changed',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'direction',
        'disabled',
        'disconnected',
        'icon',
        'iconPosition',
        'iconSize',
        'isOpen',
        'label',
        'lang',
        'opened',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'opened',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
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
        'requestUpdate',
        'toggle',
    ],
    events: ['changed', 'closed', 'connected', 'disconnected', 'opened'],
})
export class FloatingActionButtonGroupAccessor extends ElementAccessor {}
