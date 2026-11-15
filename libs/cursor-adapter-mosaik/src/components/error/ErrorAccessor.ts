// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-error` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-error',
    properties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'enter',
        'exit',
        'lang',
        'text',
        'textOverflow',
        'themeName',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'onEnterAnimation',
        'onExitAnimation',
        'play',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class ErrorAccessor extends ElementAccessor {}
