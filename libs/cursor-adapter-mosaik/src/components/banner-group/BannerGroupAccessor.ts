// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-banner-group` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-banner-group',
    properties: [
        'appearance',
        'change',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'dismissBehavior',
        'index',
        'intl',
        'lang',
        'length',
        'loop',
        'maxLength',
        'orientation',
        'pager',
        'reverse',
        'stacking',
        'themeName',
        'variant',
    ],
    readOnlyProperties: [
        'change',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'length',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'first',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'goTo',
        'hasSlot',
        'hasSlotContent',
        'last',
        'next',
        'off',
        'on',
        'previous',
        'requestUpdate',
    ],
    events: ['change', 'changed', 'connected', 'disconnected'],
})
export class BannerGroupAccessor extends ElementAccessor {}
