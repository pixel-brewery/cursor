// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-font-editor` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-font-editor',
    properties: [
        'changed',
        'collections',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'fontChanged',
        'fonts',
        'intl',
        'lang',
        'loading',
        'previewText',
        'providers',
        'searchText',
        'selected',
        'selectedCategory',
        'selectedFont',
        'selectedLetter',
        'showAlphabetFilter',
        'showCategoryFilter',
        'showCollections',
        'showPreview',
        'showSearch',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'fontChanged',
        'fonts',
        'loading',
        'selected',
    ],
    methods: [
        'addEventListener',
        'addProvider',
        'adoptStyle',
        'emit',
        'filterByCategory',
        'filterByLetter',
        'filterBySearch',
        'loadFont',
        'loadFonts',
        'off',
        'on',
        'removeProvider',
        'requestUpdate',
        'selectFont',
    ],
    events: ['changed', 'connected', 'disconnected', 'fontChanged', 'fontSelected'],
})
export class FontEditorAccessor extends ElementAccessor {}
