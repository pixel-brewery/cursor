// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-designer` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-designer',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'defaultLayers',
        'dir',
        'disconnected',
        'frameSize',
        'lang',
        'layers',
        'layersChanged',
        'mode',
        'resolvedLayers',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'layersChanged',
        'resolvedLayers',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'updateLayers',
    ],
    events: ['changed', 'connected', 'disconnected', 'layersChanged'],
})
export class DesignerAccessor extends ElementAccessor {}
