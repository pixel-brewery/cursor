// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-compound` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-compound',
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
        'deleteLabel',
        'deleteRequested',
        'description',
        'dir',
        'disabled',
        'disconnected',
        'emptyMessage',
        'header',
        'headerPlacement',
        'initialViewMode',
        'intl',
        'items',
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
        'deleteRequested',
        'disconnected',
        'items',
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
        'openItem',
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
        'deleteRequested',
        'disconnected',
        'selectedIndexChanged',
        'viewModeChanged',
    ],
})
export class CompoundAccessor extends ElementAccessor {}
