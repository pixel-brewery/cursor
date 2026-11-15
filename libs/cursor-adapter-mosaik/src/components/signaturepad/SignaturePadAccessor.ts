// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-signaturepad` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-signaturepad',
    properties: [
        'appearance',
        'backgroundColor',
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'dotSize',
        'height',
        'intl',
        'invalid',
        'isClearable',
        'isEmpty',
        'isFocused',
        'label',
        'lang',
        'maxWidth',
        'minDistance',
        'minWidth',
        'penColor',
        'placeholder',
        'required',
        'signEnded',
        'signStarted',
        'signStrokeAfterUpdate',
        'signStrokeBeforeUpdate',
        'themeName',
        'throttle',
        'value',
        'variant',
        'velocityFilterWeight',
        'width',
    ],
    readOnlyProperties: [
        'changed',
        'cleared',
        'connected',
        'controlValue',
        'disconnected',
        'isEmpty',
        'signEnded',
        'signStarted',
        'signStrokeAfterUpdate',
        'signStrokeBeforeUpdate',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'checkValidity',
        'clear',
        'emit',
        'fromData',
        'fromDataURL',
        'off',
        'on',
        'requestUpdate',
        'reset',
        'toBlob',
        'toData',
        'toDataURL',
    ],
    events: [
        'changed',
        'cleared',
        'connected',
        'disconnected',
        'signEnded',
        'signStarted',
        'signStrokeAfterUpdate',
        'signStrokeBeforeUpdate',
    ],
})
export class SignaturePadAccessor extends ElementAccessor {}
