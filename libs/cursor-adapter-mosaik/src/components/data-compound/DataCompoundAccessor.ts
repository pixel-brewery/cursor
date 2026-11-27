// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-data-compound` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-data-compound',
    properties: [
        'activeItem',
        'addAppearance',
        'addLabel',
        'addRequested',
        'addVariant',
        'canAdd',
        'canDelete',
        'canOpenItemsFromList',
        'canSwitchViewMode',
        'changed',
        'connected',
        'constrainListToSingleViewHeight',
        'controlValue',
        'controlsInHeader',
        'dataCompoundDeleteRequested',
        'deleteLabel',
        'description',
        'dir',
        'disabled',
        'disconnected',
        'emptyMessage',
        'header',
        'headerPlacement',
        'initialViewMode',
        'intl',
        'itemDefinition',
        'lang',
        'layout',
        'level',
        'listViewLabel',
        'nextLabel',
        'previousLabel',
        'selectLastOnCollectionGrowth',
        'selectedIndex',
        'selectedIndexChanged',
        'showAddLabel',
        'showNesting',
        'singleViewLabel',
        'source',
        'templates',
        'themeName',
        'viewMode',
        'viewModeChanged',
        'viewModeSwitchLabel',
    ],
    readOnlyProperties: [
        'activeItem',
        'addRequested',
        'changed',
        'connected',
        'controlValue',
        'dataCompoundDeleteRequested',
        'disconnected',
        'level',
        'selectedIndexChanged',
        'viewModeChanged',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'registerItemTemplate',
        'requestAdd',
        'requestDelete',
        'requestUpdate',
        'selectNext',
        'selectPrevious',
        'selectViewMode',
    ],
    events: [
        'addRequested',
        'changed',
        'connected',
        'dataCompoundDeleteRequested',
        'disconnected',
        'selectedIndexChanged',
        'viewModeChanged',
    ],
})
export class DataCompoundAccessor extends ElementAccessor {}
