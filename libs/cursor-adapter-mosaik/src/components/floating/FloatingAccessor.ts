// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-floating` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-floating',
    properties: [
        'active',
        'activeChanged',
        'anchor',
        'animationTarget',
        'arrow',
        'arrowPadding',
        'arrowPlacement',
        'autoSize',
        'autoSizeBoundary',
        'autoSizePadding',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'distance',
        'elevation',
        'enter',
        'exit',
        'flip',
        'flipBoundary',
        'flipFallbackPlacements',
        'flipFallbackStrategy',
        'flipPadding',
        'height',
        'isFullScreen',
        'isVisible',
        'lang',
        'maxHeight',
        'maxWidth',
        'placement',
        'repositioned',
        'shift',
        'shiftBoundary',
        'shiftCrossAxis',
        'shiftPadding',
        'skidding',
        'strategy',
        'sync',
        'themeName',
        'width',
    ],
    readOnlyProperties: [
        'activeChanged',
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isVisible',
        'repositioned',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'emit',
        'getScrollableElement',
        'off',
        'on',
        'open',
        'play',
        'reposition',
        'requestUpdate',
    ],
    events: ['activeChanged', 'changed', 'connected', 'disconnected', 'repositioned'],
})
export class FloatingAccessor extends ElementAccessor {}
