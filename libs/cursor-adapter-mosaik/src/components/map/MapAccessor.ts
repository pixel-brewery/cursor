// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-map` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-map',
    properties: [
        'areas',
        'changed',
        'cluster',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'height',
        'intl',
        'label',
        'lang',
        'latitude',
        'longitude',
        'mapCameraChanged',
        'mapError',
        'mapMarkerSelected',
        'mapReady',
        'mapStyle',
        'markers',
        'mode',
        'provider',
        'routes',
        'showControls',
        'themeName',
        'vectorSource',
        'width',
        'workerUrl',
        'zoom',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'mapCameraChanged',
        'mapError',
        'mapMarkerSelected',
        'mapReady',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'fitBounds',
        'off',
        'on',
        'requestUpdate',
        'retry',
    ],
    events: [
        'changed',
        'connected',
        'disconnected',
        'mapCameraChanged',
        'mapError',
        'mapMarkerSelected',
        'mapReady',
    ],
})
export class MapAccessor extends ElementAccessor {}
