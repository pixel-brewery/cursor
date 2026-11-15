// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-split` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-split',
    properties: [
        'changed',
        'collapsedPanel',
        'collapsible',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'fit',
        'hasPanels',
        'intl',
        'isCollapsed',
        'isEndCollapsed',
        'isStartCollapsed',
        'lang',
        'lock',
        'max',
        'min',
        'orientation',
        'position',
        'positionInPixels',
        'positionPercentage',
        'reverse',
        'snapThreshold',
        'snaps',
        'splitReposition',
        'themeName',
        'thickness',
    ],
    readOnlyProperties: [
        'changed',
        'collapsedPanel',
        'connected',
        'controlValue',
        'disconnected',
        'hasPanels',
        'isCollapsed',
        'isEndCollapsed',
        'isStartCollapsed',
        'positionInPixels',
        'positionPercentage',
        'splitReposition',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'collapse',
        'emit',
        'expand',
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
    events: ['changed', 'connected', 'disconnected', 'splitReposition'],
})
export class SplitAccessor extends ElementAccessor {}
