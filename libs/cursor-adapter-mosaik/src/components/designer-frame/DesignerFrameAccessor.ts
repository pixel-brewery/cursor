// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-designer-frame` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-designer-frame',
    properties: [
        'bounds',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'focused',
        'fold',
        'foldOffset',
        'inverseZoom',
        'label',
        'lang',
        'selected',
        'showBounds',
        'themeName',
        'viewportHeight',
        'x',
        'y',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'viewportHeight',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class DesignerFrameAccessor extends ElementAccessor {}
