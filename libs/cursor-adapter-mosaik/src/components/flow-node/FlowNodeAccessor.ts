// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-node` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-node',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isMuted',
        'isRelated',
        'isSelected',
        'label',
        'lang',
        'layoutGroup',
        'nodeKey',
        'reflowIgnore',
        'shape',
        'themeName',
        'variant',
        'x',
        'y',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isMuted',
        'isRelated',
        'isSelected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'focus',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class FlowNodeAccessor extends ElementAccessor {}
