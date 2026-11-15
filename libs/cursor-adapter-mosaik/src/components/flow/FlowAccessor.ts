// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow',
    properties: [
        'bounds',
        'changed',
        'connected',
        'controlValue',
        'controlsPosition',
        'dir',
        'direction',
        'disconnected',
        'edgeMarkerEnd',
        'edgeRouting',
        'errors',
        'fitMinZoom',
        'fitOnLoad',
        'fitPadding',
        'flowError',
        'flowLayoutCompleted',
        'flowPositionsChanged',
        'flowSelectionChanged',
        'flowViewportChanged',
        'grid',
        'highlightMode',
        'intl',
        'label',
        'lang',
        'layout',
        'layoutEngine',
        'layoutOptions',
        'maxZoom',
        'minZoom',
        'minimapPosition',
        'reflowEngine',
        'selectedKey',
        'selectionMode',
        'themeName',
        'viewport',
        'virtualized',
        'zoom',
    ],
    readOnlyProperties: [
        'bounds',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'errors',
        'flowError',
        'flowLayoutCompleted',
        'flowPositionsChanged',
        'flowSelectionChanged',
        'flowViewportChanged',
        'viewport',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'applyLayout',
        'centerOn',
        'clearSelection',
        'emit',
        'fitToView',
        'off',
        'on',
        'panBy',
        'relayout',
        'requestUpdate',
        'select',
        'setViewport',
        'setZoom',
        'zoomIn',
        'zoomOut',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'flowError',
        'flowLayoutCompleted',
        'flowPositionsChanged',
        'flowSelectionChanged',
        'flowViewportChanged',
    ],
})
export class FlowAccessor extends ElementAccessor {}
