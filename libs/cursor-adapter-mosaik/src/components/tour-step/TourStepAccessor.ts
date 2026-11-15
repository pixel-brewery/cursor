// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-tour-step` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-tour-step',
    properties: [
        'actions',
        'changed',
        'connected',
        'controlValue',
        'descriptionId',
        'dir',
        'disconnected',
        'isAutoAdvancePaused',
        'isFirstStep',
        'isLastStep',
        'labels',
        'lang',
        'progressLabel',
        'showAutoAdvanceControl',
        'showProgress',
        'step',
        'stepCount',
        'stepIndex',
        'themeName',
        'titleId',
        'variant',
    ],
    readOnlyProperties: [
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'progressLabel',
    ],
    methods: ['addEventListener', 'adoptStyle', 'emit', 'off', 'on', 'requestUpdate'],
    events: ['changed', 'connected', 'disconnected'],
})
export class TourStepAccessor extends ElementAccessor {}
