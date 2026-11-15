// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-segment` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-segment',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'indicatorAppearance',
        'indicatorVariant',
        'isIndicatorDisabled',
        'lang',
        'showScrollButtons',
        'showScrollbar',
        'size',
        'themeName',
        'variableWidth',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'indicatorAppearance',
        'indicatorVariant',
        'isIndicatorDisabled',
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
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class SegmentAccessor extends ElementAccessor {}
