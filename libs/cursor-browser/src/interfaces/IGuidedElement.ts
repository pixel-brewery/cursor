// #region Imports

import type { IAssistantPointer } from './IAssistantPointer.js';

// #endregion

/**
 * The transient element presented during a guided action.
 * @internal
 */
export interface IGuidedElement {
    readonly element: HTMLElement;
    readonly layer: Element | undefined;
    pointer: IAssistantPointer | undefined;
    dispose(): void;
}
