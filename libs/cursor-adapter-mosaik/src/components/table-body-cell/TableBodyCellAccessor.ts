// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-table-body-cell` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-table-body-cell',
    properties: [
        'changed',
        'columnHidden',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'edit',
        'formatter',
        'href',
        'isSelected',
        'lang',
        'linkText',
        'selected',
        'text',
        'textOverflow',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'selected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'deselect',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class TableBodyCellAccessor extends ElementAccessor {}
