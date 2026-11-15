// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-prompt-box-attachment-tool` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-prompt-box-attachment-tool',
    properties: [
        'accept',
        'attachmentRejected',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'directory',
        'disabled',
        'disabledWhen',
        'disconnected',
        'dock',
        'intl',
        'lang',
        'maxFileSize',
        'maxFiles',
        'multiple',
        'themeName',
    ],
    readOnlyProperties: [
        'attachmentRejected',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'attach',
        'detach',
        'emit',
        'execute',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['attachmentReject', 'changed', 'connected', 'disconnected', 'filesPicked'],
})
export class PromptBoxAttachmentToolAccessor extends ElementAccessor {}
