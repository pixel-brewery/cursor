// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-minimap` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-minimap',
    properties: [
        'changed',
        'clickOnly',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'fit',
        'isDragging',
        'label',
        'lang',
        'navigate',
        'pan',
        'project',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isDragging',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'minimapDragChanged'],
})
export class MinimapAccessor extends ElementAccessor {}
