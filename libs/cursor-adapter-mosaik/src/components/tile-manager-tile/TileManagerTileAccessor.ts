// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tile-manager-tile` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tile-manager-tile',
    properties: [
        'changed',
        'colSpan',
        'colStart',
        'connected',
        'controlValue',
        'cssContainer',
        'dir',
        'disableFullscreen',
        'disableMaximize',
        'disableResize',
        'disconnected',
        'fullscreen',
        'intl',
        'isDraggable',
        'isDragging',
        'isResizable',
        'isResizing',
        'lang',
        'maximized',
        'position',
        'resizeMode',
        'rowSpan',
        'rowStart',
        'themeName',
        'tileDragCancel',
        'tileDragEnd',
        'tileDragStart',
        'tileFullscreen',
        'tileManager',
        'tileMaximize',
        'tileResizeCancel',
        'tileResizeEnd',
        'tileResizeStart',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'cssContainer',
        'disconnected',
        'fullscreen',
        'isDraggable',
        'isDragging',
        'isResizable',
        'isResizing',
        'resizeMode',
        'tileDragCancel',
        'tileDragEnd',
        'tileDragStart',
        'tileFullscreen',
        'tileManager',
        'tileMaximize',
        'tileResizeCancel',
        'tileResizeEnd',
        'tileResizeStart',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'setDragState',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'tileDragCancel',
        'tileDragEnd',
        'tileDragStart',
        'tileFullscreen',
        'tileMaximize',
        'tileResizeCancel',
        'tileResizeEnd',
        'tileResizeStart',
    ],
})
export class TileManagerTileAccessor extends ElementAccessor {}
