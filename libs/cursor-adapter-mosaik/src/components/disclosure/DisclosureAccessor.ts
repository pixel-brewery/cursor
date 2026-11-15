// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-disclosure` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-disclosure',
    properties: [
        'caretPosition',
        'caretVisible',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isExpanded',
        'lang',
        'summary',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'hide',
        'off',
        'on',
        'requestUpdate',
        'show',
        'toggle',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class DisclosureAccessor extends ElementAccessor {}
