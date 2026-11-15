// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-router` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-router',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'currentRoute',
        'dir',
        'disconnected',
        'lang',
        'location',
        'navigated',
        'nextRoute',
        'previousRoute',
        'routes',
        'scrollRestoration',
        'scrollTargetFn',
        'useHash',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'currentRoute',
        'disconnected',
        'location',
        'navigated',
        'nextRoute',
        'previousRoute',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'navigate',
        'next',
        'off',
        'on',
        'outlet',
        'previous',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'navigated'],
})
export class RouterAccessor extends ElementAccessor {}
