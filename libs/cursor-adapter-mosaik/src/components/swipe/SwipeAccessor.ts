// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-swipe` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-swipe',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'lang',
        'panEndTriggeringThreshold',
        'panLeftDisabled',
        'panRightDisabled',
        'swipeLeft',
        'swipeRight',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'swipeLeft',
        'swipeRight',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'panLeft',
        'panRight',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'swipeLeft', 'swipeRight'],
})
export class SwipeAccessor extends ElementAccessor {}
