// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-file-upload-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-file-upload-item',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'controlled',
        'dir',
        'disconnected',
        'file',
        'intl',
        'lang',
        'progressMode',
        'showPreview',
        'themeName',
        'view',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class FileUploadItemAccessor extends ElementAccessor {}
