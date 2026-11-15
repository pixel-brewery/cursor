// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-cookies-consent` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-cookies-consent',
    properties: [
        'acceptable',
        'accepted',
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'dismissable',
        'dismissed',
        'elevation',
        'enter',
        'exit',
        'hasAcceptedCookies',
        'intl',
        'lang',
        'themeName',
    ],
    readOnlyProperties: [
        'accepted',
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'dismissed',
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
    events: [
        'changed',
        'connected',
        'cookiesAccepted',
        'cookiesDismissed',
        'disconnected',
    ],
})
export class CookiesConsentAccessor extends ElementAccessor {}
