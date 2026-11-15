// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-voice-recorder-chat-tool` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-voice-recorder-chat-tool',
    properties: [
        'canPause',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disabledWhen',
        'disconnected',
        'dock',
        'elapsedTime',
        'intl',
        'lang',
        'maxDurationTime',
        'objectUrl',
        'recCancel',
        'recPause',
        'recResume',
        'recStart',
        'recStop',
        'state',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'recCancel',
        'recPause',
        'recResume',
        'recStart',
        'recStop',
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
    events: [
        'changed',
        'connected',
        'disconnected',
        'recorderCancel',
        'recorderPause',
        'recorderResume',
        'recorderStart',
        'recorderStop',
    ],
})
export class VoiceRecorderChatToolAccessor extends ElementAccessor {}
