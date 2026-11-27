// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-files` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-files',
    properties: [
        'actionsLabel',
        'changed',
        'connected',
        'controlValue',
        'description',
        'dir',
        'disabled',
        'disconnected',
        'emptyIconName',
        'emptyMessage',
        'fileSizeUnitLabel',
        'label',
        'lang',
        'layout',
        'maxTextLines',
        'openDescription',
        'openIconName',
        'openLabel',
        'openRequested',
        'previewFit',
        'previewRatio',
        'removable',
        'removeDescription',
        'removeLabel',
        'removeRequested',
        'removeVariant',
        'retryLabel',
        'retryRequested',
        'separateListItems',
        'showFileSize',
        'showHeader',
        'themeName',
        'variant',
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
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: [
        'changed',
        'connected',
        'disconnected',
        'filesRejected',
        'filesSelected',
        'openRequested',
        'removeRequested',
        'requested',
        'retryRequested',
    ],
})
export class FilesAccessor extends ElementAccessor {}
