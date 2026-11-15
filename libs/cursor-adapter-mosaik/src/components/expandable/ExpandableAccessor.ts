// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-expandable` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-expandable',
    properties: [
        'animationTarget',
        'changed',
        'collapsed',
        'connected',
        'controlValue',
        'dir',
        'direction',
        'disabled',
        'disconnected',
        'enter',
        'exit',
        'expanded',
        'isExpanded',
        'lang',
        'themeName',
        'toggled',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'collapsed',
        'connected',
        'controlValue',
        'disconnected',
        'expanded',
        'toggled',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'collapse',
        'emit',
        'expand',
        'off',
        'on',
        'play',
        'requestUpdate',
        'toggle',
    ],
    events: [
        'changed',
        'collapsed',
        'connected',
        'disconnected',
        'expanded',
        'toggled',
    ],
})
export class ExpandableAccessor extends ElementAccessor {}
