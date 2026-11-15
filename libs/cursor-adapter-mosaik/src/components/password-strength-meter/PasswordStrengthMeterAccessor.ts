// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-password-strength-meter` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-password-strength-meter',
    properties: [
        'appearance',
        'blankLabel',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'for',
        'hideMeter',
        'intl',
        'label',
        'labelPosition',
        'lang',
        'level',
        'mediumLabel',
        'mediumThreshold',
        'minLength',
        'minimumFill',
        'password',
        'rulesDisplay',
        'score',
        'segments',
        'strongLabel',
        'strongThreshold',
        'target',
        'themeName',
        'veryStrongLabel',
        'veryStrongThreshold',
        'veryWeakLabel',
        'weakLabel',
        'weakThreshold',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'level',
        'score',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class PasswordStrengthMeterAccessor extends ElementAccessor {}
