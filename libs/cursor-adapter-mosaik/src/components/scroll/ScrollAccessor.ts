// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-scroll` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-scroll',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isAtScrollBottom',
        'isAtScrollEnd',
        'isAtScrollStart',
        'isAtScrollTop',
        'isScrollable',
        'lang',
        'orientation',
        'showScrollButtons',
        'showScrollbar',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isAtScrollBottom',
        'isAtScrollEnd',
        'isAtScrollStart',
        'isAtScrollTop',
        'isScrollable',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getScrollableElement',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
        'scrollByDirection',
        'scrollToPosition',
    ],
    events: ['changed', 'connected', 'disconnected', 'scroll'],
})
export class ScrollAccessor extends ElementAccessor {}
