// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-persona` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-persona',
    properties: [
        'appearance',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'displayMode',
        'hasBadge',
        'horizontalContentAlignment',
        'icon',
        'lang',
        'orientation',
        'presence',
        'primaryText',
        'quaternaryText',
        'secondaryText',
        'size',
        'src',
        'tertiaryText',
        'text',
        'textAccessor',
        'themeName',
        'variant',
        'verticalContentAlignment',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'displayMode',
        'hasBadge',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'changeTextAccessor',
        'emit',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class PersonaAccessor extends ElementAccessor {}
