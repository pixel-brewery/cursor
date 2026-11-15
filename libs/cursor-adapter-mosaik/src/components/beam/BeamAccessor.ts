// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-beam` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-beam',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'cornerRadius',
        'delay',
        'dir',
        'disconnected',
        'duration',
        'lang',
        'mode',
        'motionState',
        'offset',
        'reverse',
        'routing',
        'source',
        'sourceSide',
        'step',
        'target',
        'targetSide',
        'themeName',
        'travel',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'motionState',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'off',
        'on',
        'refresh',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class BeamAccessor extends ElementAccessor {}
