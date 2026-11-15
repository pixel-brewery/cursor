// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-app` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-app',
    properties: [
        'changed',
        'connected',
        'content',
        'controlValue',
        'dir',
        'disconnected',
        'hasHeader',
        'hasNav',
        'header',
        'isMobile',
        'isNavOpen',
        'lang',
        'theme',
        'themeName',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'content',
        'controlValue',
        'disconnected',
        'hasHeader',
        'header',
        'isMobile',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'closeNavigation',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'openNavigation',
        'requestUpdate',
        'toggleNavigation',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class AppAccessor extends ElementAccessor {}
