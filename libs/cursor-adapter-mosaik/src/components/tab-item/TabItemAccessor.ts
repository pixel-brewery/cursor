// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tab-item` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tab-item',
    properties: [
        'animationTarget',
        'changed',
        'closeable',
        'closed',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'enter',
        'exit',
        'icon',
        'iconPosition',
        'iconSize',
        'isSelected',
        'label',
        'lang',
        'orientation',
        'selected',
        'themeName',
        'value',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'closed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'selected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'close',
        'deselect',
        'emit',
        'off',
        'on',
        'play',
        'requestUpdate',
        'select',
    ],
    events: [
        'changed',
        'closed',
        'connected',
        'deselected',
        'disconnected',
        'selected',
    ],
})
export class TabItemAccessor extends ElementAccessor {}
