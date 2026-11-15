// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-popup` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-popup',
    properties: [
        'anchorElement',
        'animationTarget',
        'appearance',
        'attention',
        'boundary',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeOnScroll',
        'closeable',
        'closed',
        'connected',
        'control',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'distance',
        'elevation',
        'enter',
        'exit',
        'flip',
        'for',
        'hasBackdrop',
        'hideDelay',
        'interactive',
        'isOpen',
        'lang',
        'opened',
        'placement',
        'placements',
        'pressEscapeToClose',
        'restoreFocus',
        'shift',
        'shiftBoundary',
        'shiftPadding',
        'showDelay',
        'skidding',
        'staysOpen',
        'sync',
        'themeName',
        'trapFocus',
        'trigger',
        'variant',
    ],
    readOnlyProperties: [
        'anchorElement',
        'animationTarget',
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'control',
        'controlValue',
        'disconnected',
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
        'requestAttention',
        'requestUpdate',
        'toggle',
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
export class PopupAccessor extends ElementAccessor {}
