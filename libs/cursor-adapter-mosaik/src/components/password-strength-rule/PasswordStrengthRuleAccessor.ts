// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-password-strength-rule` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-password-strength-rule',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'flags',
        'hint',
        'label',
        'lang',
        'metIcon',
        'metLabel',
        'minLength',
        'pattern',
        'pendingIcon',
        'pendingLabel',
        'resolvedStatus',
        'status',
        'themeName',
        'unmetIcon',
        'unmetLabel',
        'weight',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'resolvedStatus',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class PasswordStrengthRuleAccessor extends ElementAccessor {}
