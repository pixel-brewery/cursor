// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-epg-program` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-epg-program',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'displayText',
        'end',
        'header',
        'intl',
        'isFiltered',
        'isFocused',
        'lane',
        'lang',
        'locale',
        'root',
        'start',
        'themeName',
        'value',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'displayText',
        'root',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected', 'select'],
})
export class EpgProgramAccessor extends ElementAccessor {}
