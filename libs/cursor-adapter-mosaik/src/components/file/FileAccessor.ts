// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-file` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-file',
    properties: [
        'actionsLabel',
        'changed',
        'connected',
        'contentType',
        'controlValue',
        'description',
        'dir',
        'disabled',
        'disconnected',
        'file',
        'fileKey',
        'fileName',
        'lang',
        'maxTextLines',
        'openDescription',
        'openIconName',
        'openLabel',
        'openRequested',
        'presentation',
        'preview',
        'previewFit',
        'previewRatio',
        'previewUrl',
        'progress',
        'removable',
        'removeDescription',
        'removeLabel',
        'removeRequested',
        'removeVariant',
        'retryLabel',
        'retryRequested',
        'size',
        'sizeInBytes',
        'state',
        'stateLabel',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'openRequested',
        'removeRequested',
        'retryRequested',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestOpen',
        'requestRemoval',
        'requestRetry',
        'requestUpdate',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'openRequested',
        'removeRequested',
        'retryRequested',
    ],
})
export class FileAccessor extends ElementAccessor {}
