// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-condition-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-condition-group',
    properties: [
        'addGroupLabel',
        'addGroupRequested',
        'addLabel',
        'addRuleLabel',
        'addRuleRequested',
        'allowConditionChange',
        'andLabel',
        'canAddGroup',
        'canAddRule',
        'canRemove',
        'changed',
        'condition',
        'conditionChanged',
        'conditionLabel',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'inlineActions',
        'intl',
        'lang',
        'orLabel',
        'removeGroupRequested',
        'removeLabel',
        'removeVariant',
        'showLeadingLine',
        'themeName',
    ],
    readOnlyProperties: [
        'addGroupRequested',
        'addRuleRequested',
        'changed',
        'conditionChanged',
        'connected',
        'controlValue',
        'disconnected',
        'removeGroupRequested',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: [
        'addGroupRequested',
        'addRuleRequested',
        'changed',
        'conditionChanged',
        'connected',
        'disconnected',
        'removeGroupRequested',
    ],
})
export class ConditionGroupAccessor extends ElementAccessor {}
