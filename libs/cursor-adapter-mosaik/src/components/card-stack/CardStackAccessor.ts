// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-card-stack` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-card-stack',
    properties: [
        'cards',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'index',
        'interval',
        'intl',
        'label',
        'lang',
        'mode',
        'motionState',
        'showDots',
        'spread',
        'themeName',
        'threshold',
        'visible',
    ],
    readOnlyProperties: [
        'cards',
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
        'goTo',
        'hasSlot',
        'hasSlotContent',
        'next',
        'off',
        'on',
        'onSlotChanges',
        'previous',
        'requestUpdate',
    ],
    events: ['change', 'changed', 'connected', 'disconnected'],
})
export class CardStackAccessor extends ElementAccessor {}
