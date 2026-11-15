// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-mention` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-mention',
    properties: [
        'cardProvider',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'isInteractive',
        'kind',
        'label',
        'lang',
        'mentionInvoked',
        'reference',
        'referenceId',
        'themeName',
        'tone',
        'trigger',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'mentionInvoked',
        'reference',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'invoke',
        'off',
        'on',
        'requestUpdate',
    ],
    events: ['changed', 'connected', 'disconnected', 'mentionInvoked'],
})
export class MentionAccessor extends ElementAccessor {}
