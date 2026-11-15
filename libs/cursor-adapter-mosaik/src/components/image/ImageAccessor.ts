// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-image` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-image',
    properties: [
        'alt',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'fit',
        'height',
        'hoverZoom',
        'imageFailed',
        'imageLoaded',
        'lang',
        'legend',
        'legendPosition',
        'ratio',
        'showEmpty',
        'showFailed',
        'showPending',
        'src',
        'srcset',
        'state',
        'themeName',
        'thumbnailSrc',
        'variant',
        'width',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'imageFailed',
        'imageLoaded',
        'state',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'imageFailed', 'imageLoaded'],
})
export class ImageAccessor extends ElementAccessor {}
