// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-text-effect` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-text-effect',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'effect',
        'fullText',
        'interval',
        'label',
        'lang',
        'mediaKind',
        'mediaSource',
        'motionState',
        'poster',
        'reverse',
        'text',
        'themeName',
        'variant',
        'words',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'fullText',
        'motionState',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TextEffectAccessor extends ElementAccessor {}
