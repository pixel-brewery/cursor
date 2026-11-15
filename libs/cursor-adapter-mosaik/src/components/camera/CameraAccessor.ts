// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-camera` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-camera',
    properties: [
        'autoFullScreen',
        'autoPlay',
        'captureFormat',
        'captured',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'frame',
        'height',
        'isRecorderSupported',
        'isSupported',
        'lang',
        'poster',
        'recorded',
        'recorderFormat',
        'src',
        'themeName',
        'type',
        'width',
    ],
    readOnlyProperties: [
        'captured',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isRecorderSupported',
        'isSupported',
        'recorded',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'capture',
        'emit',
        'off',
        'on',
        'record',
        'requestUpdate',
    ],
    events: ['captured', 'changed', 'connected', 'disconnected', 'error', 'recorded'],
})
export class CameraAccessor extends ElementAccessor {}
