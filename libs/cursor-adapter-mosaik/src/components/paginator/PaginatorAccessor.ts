// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-paginator` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-paginator',
    properties: [
        'alwaysShow',
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'currentPage',
        'currentPageReportTemplate',
        'dir',
        'disabled',
        'disconnected',
        'first',
        'hasNextPage',
        'hasPreviousPage',
        'intl',
        'isVisible',
        'lang',
        'pageChanged',
        'pageLinkSize',
        'pageSizeChanged',
        'rangeEnd',
        'rangeStart',
        'rows',
        'showCurrentPageReport',
        'showFirstLastButtons',
        'showFirstLastIcon',
        'showPageLinks',
        'showSizes',
        'size',
        'sizes',
        'themeName',
        'total',
        'totalPages',
        'totalRecords',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'hasNextPage',
        'hasPreviousPage',
        'isVisible',
        'pageChanged',
        'pageSizeChanged',
        'rangeEnd',
        'rangeStart',
        'totalPages',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'changePageSize',
        'emit',
        'goToFirstPage',
        'goToLastPage',
        'goToNextPage',
        'goToPage',
        'goToPreviousPage',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'pageChanged', 'pageSizeChanged'],
})
export class PaginatorAccessor extends ElementAccessor {}
