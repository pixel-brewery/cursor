// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-resize-thumb` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-resize-thumb',
    properties: [
        'allowedDirections',
        'autoApply',
        'changed',
        'connected',
        'control',
        'controlValue',
        'dir',
        'direction',
        'disabled',
        'disconnected',
        'for',
        'isResizing',
        'lang',
        'maxHeight',
        'maxWidth',
        'minHeight',
        'minWidth',
        'resizeEnd',
        'resizeStart',
        'resizing',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'control',
        'controlValue',
        'disconnected',
        'isResizing',
        'resizeEnd',
        'resizeStart',
        'resizing',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'attach',
        'detach',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'resizeEnd',
        'resizeStart',
        'resizing',
    ],
})
export class ResizeThumbAccessor extends ElementAccessor {}
