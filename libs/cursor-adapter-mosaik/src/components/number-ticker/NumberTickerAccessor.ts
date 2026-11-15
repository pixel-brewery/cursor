// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-number-ticker` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-number-ticker',
    properties: [
        'alignment',
        'changed',
        'connected',
        'controlValue',
        'decimals',
        'dir',
        'disconnected',
        'duration',
        'from',
        'grouping',
        'lang',
        'locale',
        'motionState',
        'prefixText',
        'repeat',
        'suffixText',
        'text',
        'themeName',
        'to',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'motionState',
        'text',
        'value',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'format',
        'off',
        'on',
        'replay',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class NumberTickerAccessor extends ElementAccessor {}
