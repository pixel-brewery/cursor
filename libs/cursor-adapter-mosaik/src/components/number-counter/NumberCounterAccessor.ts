// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-number-counter` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-number-counter',
    properties: [
        'alignment',
        'changed',
        'connected',
        'controlValue',
        'decimals',
        'dir',
        'disabled',
        'disconnected',
        'duration',
        'from',
        'grouping',
        'lang',
        'locale',
        'prefixText',
        'readonly',
        'suffixText',
        'themeName',
        'to',
        'variant',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'format',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class NumberCounterAccessor extends ElementAccessor {}
