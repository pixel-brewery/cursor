// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-audio` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-audio',
    properties: [
        'autoPlay',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'hasSrc',
        'height',
        'lang',
        'legend',
        'legendPosition',
        'loop',
        'muted',
        'ratio',
        'showControls',
        'src',
        'themeName',
        'width',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasSrc',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'load',
        'off',
        'on',
        'pause',
        'play',
        'requestUpdate',
        'toggle',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class AudioAccessor extends ElementAccessor {}
