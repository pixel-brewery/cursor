// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-file-picker` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-file-picker',
    properties: [
        'accept',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'directory',
        'disabled',
        'disconnected',
        'filesPicked',
        'lang',
        'multiple',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'filesPicked',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'pick',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'filesPicked'],
})
export class FilePickerAccessor extends ElementAccessor {}
