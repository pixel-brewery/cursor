// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-wallet-card` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-wallet-card',
    properties: [
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'holder',
        'holderLabel',
        'identifier',
        'identifierLabel',
        'image',
        'issuer',
        'label',
        'lang',
        'layout',
        'orientation',
        'ratio',
        'showChip',
        'showContactless',
        'showMagneticStripe',
        'subtitle',
        'themeName',
        'title',
        'validity',
        'validityLabel',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: [
        'addEventListener',
        'adoptStyle',
        'assignToSlot',
        'emit',
        'getSlotAssignments',
        'getSlotAssignmentsOf',
        'getSlotContent',
        'hasSlot',
        'hasSlotContent',
        'off',
        'on',
        'onSlotChanges',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected'],
})
export class WalletCardAccessor extends ElementAccessor {}
