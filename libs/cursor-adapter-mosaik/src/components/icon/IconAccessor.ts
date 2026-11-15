// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-icon` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-icon',
    properties: [
        'angle',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'definition',
        'dir',
        'disabled',
        'disconnected',
        'icon',
        'inline',
        'label',
        'lang',
        'readonly',
        'size',
        'themeName',
        'variant',
        'viewBox',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'definition',
        'disconnected',
        'viewBox',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class IconAccessor extends ElementAccessor {}
