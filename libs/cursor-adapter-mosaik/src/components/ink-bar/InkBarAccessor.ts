// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-ink-bar` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-ink-bar',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'lang',
        'origin',
        'position',
        'target',
        'themeName',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'align',
        'emit',
        'off',
        'on',
        'requestUpdate',
        'stretchToward',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class InkBarAccessor extends ElementAccessor {}
