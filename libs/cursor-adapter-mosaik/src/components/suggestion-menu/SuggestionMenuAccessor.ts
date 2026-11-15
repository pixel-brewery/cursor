// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-suggestion-menu` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-suggestion-menu',
    properties: [
        'anchor',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'intl',
        'isOpen',
        'lang',
        'menuId',
        'placement',
        'state',
        'suggestionChosen',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isOpen',
        'suggestionChosen',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'choose',
        'emit',
        'hide',
        'listElement',
        'off',
        'on',
        'optionElement',
        'requestUpdate',
        'show',
    ],
    events: ['changed', 'connected', 'disconnected', 'suggestionChosen'],
})
export class SuggestionMenuAccessor extends ElementAccessor {}
