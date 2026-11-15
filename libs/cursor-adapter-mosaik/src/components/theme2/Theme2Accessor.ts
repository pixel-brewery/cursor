// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-theme2` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-theme2',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'global',
        'lang',
        'name',
        'theme',
        'themeMode',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'applyElevation',
        'applyFontFamily',
        'applyLayout',
        'applyPalette',
        'applyScheme',
        'applyTheme',
        'applyTypography',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class Theme2Accessor extends ElementAccessor {}
