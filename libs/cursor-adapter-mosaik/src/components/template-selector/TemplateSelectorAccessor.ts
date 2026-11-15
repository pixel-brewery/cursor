// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-template-selector` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-template-selector',
    properties: ['changed', 'connected', 'controlValue', 'dir', 'disconnected', 'lang'],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TemplateSelectorAccessor extends ElementAccessor {}
