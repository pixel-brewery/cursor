// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-carousel` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-carousel',
    properties: [
        'appearance',
        'autoplay',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'displayMode',
        'groupSize',
        'hasItems',
        'hasNext',
        'hasPrevious',
        'indicatorMode',
        'intl',
        'items',
        'itemsChanged',
        'lang',
        'loop',
        'navigationPosition',
        'pageCount',
        'pageIndex',
        'pageSize',
        'selectedIndex',
        'selectedItem',
        'selectionChanged',
        'showIndicator',
        'showNavigation',
        'slideAlignment',
        'themeName',
        'timeout',
        'variant',
        'visibleItemCount',
        'visibleItems',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'groupSize',
        'hasItems',
        'hasNext',
        'hasPrevious',
        'items',
        'itemsChanged',
        'pageCount',
        'pageIndex',
        'selectedIndex',
        'selectedItem',
        'selectionChanged',
        'visibleItemCount',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'deselect',
        'emit',
        'off',
        'on',
        'pause',
        'requestUpdate',
        'resetSelection',
        'resume',
        'select',
        'selectFirst',
        'selectLast',
        'selectNext',
        'selectPage',
        'selectPrevious',
        'start',
        'stop',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'itemsChanged',
        'selectionChanged',
    ],
})
export class CarouselAccessor extends ElementAccessor {}
