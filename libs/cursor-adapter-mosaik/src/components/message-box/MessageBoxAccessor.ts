// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-message-box` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-message-box',
    properties: [
        'alignment',
        'animationTarget',
        'appearance',
        'attention',
        'buttons',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'dragging',
        'elevation',
        'enter',
        'exit',
        'formatter',
        'hasBackdrop',
        'header',
        'height',
        'icon',
        'initialResult',
        'intl',
        'isDraggable',
        'isFullScreen',
        'isOpen',
        'lang',
        'message',
        'offsetX',
        'offsetY',
        'opened',
        'pressEscapeToClose',
        'subHeader',
        'themeName',
        'variant',
        'width',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'dragging',
        'offsetX',
        'offsetY',
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
        'play',
        'requestAttention',
        'requestUpdate',
    ],
    events: [
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'dialogResult',
        'disconnected',
        'opened',
    ],
})
export class MessageBoxAccessor extends ElementAccessor {}
