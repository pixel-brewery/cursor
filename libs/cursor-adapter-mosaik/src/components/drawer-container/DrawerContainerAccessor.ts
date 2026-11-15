// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-drawer-container` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-drawer-container',
    properties: [
        'autoSize',
        'changed',
        'connected',
        'content',
        'contentMarginChanged',
        'controlValue',
        'dir',
        'disconnected',
        'drawer',
        'fit',
        'hasBackdrop',
        'isOpen',
        'lang',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'content',
        'contentMarginChanged',
        'controlValue',
        'disconnected',
        'drawer',
        'isOpen',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'emit',
        'off',
        'on',
        'open',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'contentMarginChanged', 'disconnected'],
})
export class DrawerContainerAccessor extends ElementAccessor {}
