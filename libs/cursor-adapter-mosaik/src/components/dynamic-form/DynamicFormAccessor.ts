// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-dynamic-form` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-dynamic-form',
    properties: [
        'canSubmit',
        'changed',
        'connected',
        'controlValue',
        'definition',
        'dir',
        'disabled',
        'disconnected',
        'fieldTemplates',
        'intl',
        'isReadonly',
        'lang',
        'themeName',
        'useSectionHeaders',
        'valid',
        'validationAttempted',
        'value',
        'valueChanged',
    ],
    readOnlyProperties: [
        'canSubmit',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'valid',
        'valueChanged',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'emit',
        'markFieldTouched',
        'off',
        'on',
        'registerFieldTemplate',
        'requestUpdate',
        'setFieldValue',
    ],
    events: ['changed', 'connected', 'disconnected', 'valueChanged'],
})
export class DynamicFormAccessor extends ElementAccessor {}
