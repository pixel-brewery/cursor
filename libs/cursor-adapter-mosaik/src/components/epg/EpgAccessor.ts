// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-epg` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-epg',
    properties: [
        'appearance',
        'changed',
        'channels',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'end',
        'filter',
        'filterMemberPath',
        'filterPlaceholder',
        'gestureEnabled',
        'intl',
        'isNow',
        'items',
        'lang',
        'locale',
        'showFilter',
        'showMinimap',
        'showNowLine',
        'start',
        'themeName',
        'timelineFormat',
        'variant',
        'virtualized',
        'visibleEnd',
        'visibleStart',
        'zoom',
    ],
    readOnlyProperties: [
        'changed',
        'channels',
        'connected',
        'controlValue',
        'disconnected',
        'isNow',
        'items',
        'visibleEnd',
        'visibleStart',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'dragStart',
        'emit',
        'nextDate',
        'off',
        'on',
        'previousDate',
        'requestUpdate',
        'scrollToNow',
        'touchStart',
        'zoomIn',
        'zoomOut',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class EpgAccessor extends ElementAccessor {}
