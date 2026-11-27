// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-file-source` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-file-source',
    properties: [
        'accept',
        'appearance',
        'busy',
        'changed',
        'connected',
        'controlValue',
        'description',
        'dir',
        'directory',
        'disabled',
        'disconnected',
        'dropEnabled',
        'filesRejected',
        'filesSelected',
        'iconName',
        'key',
        'label',
        'lang',
        'multiple',
        'requested',
        'size',
        'themeName',
        'type',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'filesRejected',
        'filesSelected',
        'requested',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'receiveFiles',
        'rejectFiles',
        'request',
        'requestUpdate',
        'selectFiles',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'filesRejected',
        'filesSelected',
        'requested',
    ],
})
export class FileSourceAccessor extends ElementAccessor {}
