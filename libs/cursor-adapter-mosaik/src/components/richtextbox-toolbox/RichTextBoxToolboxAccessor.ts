// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-richtextbox-toolbox` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-richtextbox-toolbox',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'editor',
        'intl',
        'lang',
        'themeName',
        'tools',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'cancelLink',
        'cancelPopup',
        'emit',
        'execute',
        'off',
        'on',
        'openImage',
        'openLink',
        'removeLink',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class RichTextBoxToolboxAccessor extends ElementAccessor {}
