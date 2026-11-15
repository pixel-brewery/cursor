// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-banner` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-banner',
    properties: [
        'appearance',
        'changed',
        'closeable',
        'closed',
        'collapsed',
        'collapsible',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'elevation',
        'expanded',
        'fit',
        'formatter',
        'header',
        'horizontalContentAlignment',
        'icon',
        'iconSize',
        'isExpanded',
        'isOpen',
        'lang',
        'opened',
        'orientation',
        'subHeader',
        'themeName',
        'toggled',
        'variant',
        'verticalContentAlignment',
    ],
    readOnlyProperties: [
        'changed',
        'closed',
        'collapsed',
        'connected',
        'controlValue',
        'disconnected',
        'expanded',
        'opened',
        'toggled',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'close',
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
        'open',
        'requestUpdate',
        'toggle',
        'toggleExpansion',
    ],
    events: [
        'changed',
        'closed',
        'collapsed',
        'connected',
        'disconnected',
        'expanded',
        'opened',
        'toggled',
    ],
})
export class BannerAccessor extends ElementAccessor {}
