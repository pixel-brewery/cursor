// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-toast` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-toast',
    properties: [
        'animationTarget',
        'appearance',
        'attention',
        'changed',
        'clickOutsideToClose',
        'closeAttempted',
        'closeable',
        'closed',
        'connected',
        'content',
        'controlValue',
        'dir',
        'disconnected',
        'enter',
        'exit',
        'formatter',
        'hasBackdrop',
        'header',
        'icon',
        'iconSize',
        'isBusy',
        'isOpen',
        'lang',
        'maxWidth',
        'opened',
        'position',
        'pressEscapeToClose',
        'showProgress',
        'themeName',
        'timeout',
        'variant',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'controlValue',
        'disconnected',
        'opened',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'emit',
        'off',
        'on',
        'open',
        'play',
        'requestAttention',
        'requestUpdate',
    ],
    events: [
        'changed',
        'closeAttempted',
        'closed',
        'connected',
        'disconnected',
        'opened',
    ],
})
export class ToastAccessor extends ElementAccessor {}
