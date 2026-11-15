// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-column-editor` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-column-editor',
    properties: [
        'allVisible',
        'changed',
        'columns',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'filter',
        'filteredColumns',
        'intl',
        'isDragEnabled',
        'lang',
        'tableColumnEditorChanged',
        'tableColumnEditorDismissed',
        'themeName',
    ],
    readOnlyProperties: [
        'allVisible',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'filter',
        'filteredColumns',
        'isDragEnabled',
        'tableColumnEditorChanged',
        'tableColumnEditorDismissed',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'dismiss',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'tableColumnEditorChanged',
        'tableColumnEditorDismissed',
    ],
})
export class TableColumnEditorAccessor extends ElementAccessor {}
