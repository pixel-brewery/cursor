// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-wizard-step` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-wizard-step',
    properties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'dir',
        'disabled',
        'disconnected',
        'displayText',
        'enter',
        'exit',
        'header',
        'index',
        'inset',
        'isActive',
        'isSelected',
        'lang',
        'parent',
        'selected',
        'subHeader',
        'themeName',
        'value',
    ],
    readOnlyProperties: [
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'deselected',
        'disconnected',
        'displayText',
        'index',
        'parent',
        'selected',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'deselect',
        'emit',
        'off',
        'on',
        'play',
        'requestUpdate',
        'select',
    ],
    events: ['changed', 'connected', 'deselected', 'disconnected', 'selected'],
})
export class WizardStepAccessor extends ElementAccessor {}
