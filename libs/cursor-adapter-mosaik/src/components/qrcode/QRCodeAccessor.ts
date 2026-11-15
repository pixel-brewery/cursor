// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-qrcode` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-qrcode',
    properties: [
        'backgroundColor',
        'changed',
        'connected',
        'controlValue',
        'dimension',
        'dir',
        'disconnected',
        'errorCorrection',
        'foregroundColor',
        'lang',
        'radius',
        'text',
        'themeName',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'toBlob',
        'toDataURL',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class QRCodeAccessor extends ElementAccessor {}
