// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-designer-canvas` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-designer-canvas',
    properties: [
        'arrangement',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'interactionMode',
        'isNavigating',
        'isPanning',
        'lang',
        'maxZoom',
        'minZoom',
        'panX',
        'panY',
        'themeName',
        'viewport',
        'viewportChanged',
        'viewportSettled',
        'zoom',
        'zoomChanged',
        'zoomLevel',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isNavigating',
        'isPanning',
        'panX',
        'panY',
        'viewport',
        'viewportChanged',
        'viewportSettled',
        'zoomChanged',
        'zoomLevel',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'fitToContent',
        'fitToFrame',
        'off',
        'on',
        'panBy',
        'requestUpdate',
        'resetZoom',
        'screenToWorld',
        'setViewport',
        'setZoom',
        'worldToScreen',
        'zoomAt',
        'zoomIn',
        'zoomOut',
        'zoomToRect',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'viewportChanged',
        'viewportSettled',
        'zoomChanged',
    ],
})
export class DesignerCanvasAccessor extends ElementAccessor {}
