// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-flow-edge` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-flow-edge',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'cornerRadius',
        'dir',
        'disconnected',
        'edgeKey',
        'geometry',
        'isMuted',
        'isRelated',
        'isSelected',
        'label',
        'labelPosition',
        'lang',
        'markerEnd',
        'offset',
        'pathBuilder',
        'routing',
        'showPorts',
        'source',
        'sourcePort',
        'sourceSide',
        'target',
        'targetSide',
        'themeName',
        'waypoints',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'geometry',
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
export class FlowEdgeAccessor extends ElementAccessor {}
