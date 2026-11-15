// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-drawer` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-drawer',
    properties: [
        'animationTarget',
        'attention',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'drawerRootStyles',
        'elevation',
        'enter',
        'exit',
        'hasBackdrop',
        'hasDrawerHeaderContent',
        'hasInset',
        'hasShadow',
        'header',
        'height',
        'isComposed',
        'isFullScreen',
        'isOpen',
        'lang',
        'mode',
        'opened',
        'position',
        'pressEscapeToClose',
        'subHeader',
        'themeName',
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
        'drawerRootStyles',
        'hasDrawerHeaderContent',
        'hasInset',
        'isComposed',
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
        'innerOffsetWidth',
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
export class DrawerAccessor extends ElementAccessor {}
