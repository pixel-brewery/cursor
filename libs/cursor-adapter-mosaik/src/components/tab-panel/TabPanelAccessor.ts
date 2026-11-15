// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab-panel` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab-panel',
    properties: [
        'alignment',
        'appearance',
        'canScrollToEnd',
        'canScrollToStart',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'enableGestures',
        'hasIndicator',
        'hasScrollableContent',
        'lang',
        'placement',
        'themeName',
    ],
    readOnlyProperties: [
        'canScrollToEnd',
        'canScrollToStart',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasScrollableContent',
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
        'render',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class TabPanelAccessor extends ElementAccessor {}
