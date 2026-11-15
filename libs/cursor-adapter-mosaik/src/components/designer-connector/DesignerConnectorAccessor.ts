// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-designer-connector` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-designer-connector',
    properties: [
        'arrow',
        'changed',
        'connected',
        'controlValue',
        'dir',
        'disconnected',
        'from',
        'inverseZoom',
        'label',
        'lang',
        'routing',
        'selected',
        'themeName',
        'to',
    ],
    readOnlyProperties: ['changed', 'connected', 'controlValue', 'disconnected'],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class DesignerConnectorAccessor extends ElementAccessor {}
