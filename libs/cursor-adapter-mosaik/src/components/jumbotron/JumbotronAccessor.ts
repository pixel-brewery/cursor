// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-jumbotron` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-jumbotron',
    properties: [
        'alignment',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'formatter',
        'header',
        'hint',
        'lang',
        'subHeader',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class JumbotronAccessor extends ElementAccessor {}
