// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ElementAccessor } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the `mosaik-dropdown` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: 'mosaik-dropdown',
    properties: [
        '_anchorId',
        '_anchorName',
        '_panelId',
        'animationTarget',
        'changed',
        'closeOnEscape',
        'closeOnOutsideClick',
        'closeOnSelect',
        'connected',
        'controlValue',
        'dir',
        'disabled',
        'disconnected',
        'dropDownDistance',
        'dropDownHeight',
        'dropDownMaxHeight',
        'dropDownMaxWidth',
        'dropDownPlacement',
        'dropDownSkidding',
        'dropDownStaysOpen',
        'dropDownStrategy',
        'dropDownWidth',
        'enter',
        'exit',
        'hasPopup',
        'height',
        'isDropDownOpen',
        'isVisible',
        'lang',
        'matchAnchorWidth',
        'maxHeight',
        'maxWidth',
        'offset',
        'open',
        'openChanged',
        'panelLabel',
        'placement',
        'restoreFocus',
        'skidding',
        'strategy',
        'themeName',
        'trigger',
        'width',
    ],
    readOnlyProperties: [
        '_anchorId',
        '_anchorName',
        '_panelId',
        'animationTarget',
        'changed',
        'connected',
        'controlValue',
        'disconnected',
        'isVisible',
        'openChanged',
    ],
    methods: [
        'addEventListener',
        'adoptStyle',
        'closeDropdown',
        'emit',
        'off',
        'on',
        'openDropdown',
        'play',
        'requestUpdate',
        'toggleDropdown',
        'updatePosition',
    ],
    events: ['changed', 'connected', 'disconnected', 'openChanged'],
})
export class DropdownAccessor extends ElementAccessor {}
