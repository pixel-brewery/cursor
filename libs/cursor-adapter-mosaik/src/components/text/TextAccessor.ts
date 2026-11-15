// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-text` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-text',
    properties: [
        'alignment',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'formatter',
        'lang',
        'marker',
        'maxLength',
        'maxLines',
        'readonly',
        'text',
        'themeName',
        'truncate',
        'variant',
        'wrap',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'mark',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class TextAccessor extends ElementAccessor {}
