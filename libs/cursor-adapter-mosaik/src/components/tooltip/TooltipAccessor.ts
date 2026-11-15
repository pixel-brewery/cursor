// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tooltip` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tooltip',
    properties: [
        'anchorElement',
        'animationTarget',
        'changed',
        'closeable',
        'closed',
        'connected',
        'content',
        'control',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'enter',
        'exit',
        'for',
        'formattedContent',
        'formatter',
        'height',
        'hideDelay',
        'horizontalOffset',
        'isOpen',
        'lang',
        'opened',
        'placement',
        'showDelay',
        'staysOpen',
        'themeName',
        'trigger',
        'verticalOffset',
        'width',
    ],
    readOnlyProperties: [
        'anchorElement',
        'animationTarget',
        'changed',
        'closed',
        'connected',
        'control',
        'controlValue',
        'disconnected',
        'formattedContent',
        'opened',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'attach',
        'close',
        'detach',
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
        'play',
        'requestUpdate',
    ],
    events: ['changed', 'closed', 'connected', 'disconnected', 'opened'],
})
export class TooltipAccessor extends ElementAccessor {}
