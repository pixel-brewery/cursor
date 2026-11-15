// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-expander` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-expander',
    properties: [
        'animationTarget',
        'appearance',
        'caretPosition',
        'caretVisible',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'direction',
        'disabled',
        'disconnected',
        'enter',
        'exit',
        'header',
        'icon',
        'isExpanded',
        'lang',
        'ripple',
        'subHeader',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
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
export class ExpanderAccessor extends ElementAccessor {}
