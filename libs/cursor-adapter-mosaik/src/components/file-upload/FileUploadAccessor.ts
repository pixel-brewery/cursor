// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-file-upload` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-file-upload',
    properties: [
        'accept',
        'appearance',
        'autoUpload',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'directory',
        'disabled',
        'disconnected',
        'fileAdded',
        'fileFailed',
        'fileRemoved',
        'filesChanged',
        'intl',
        'invalid',
        'isDragging',
        'lang',
        'maxSize',
        'multiple',
        'placeholder',
        'progressMode',
        'showPreview',
        'strategy',
        'themeName',
        'value',
        'variant',
        'view',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'fileAdded',
        'fileFailed',
        'fileRemoved',
        'filesChanged',
        'isDragging',
    ],
    methods: [
        'add',
        'addEventListener',
        'adoptStyle',
        'checkValidity',
        'delete',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'reset',
        'save',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'fileAdded',
        'fileFailed',
        'fileRemoved',
        'filesChanged',
    ],
})
export class FileUploadAccessor extends ElementAccessor {}
