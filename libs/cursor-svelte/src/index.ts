/**
 * Svelte context and actions for configuring Cursor and registering rendered targets.
 *
 * @packageDocumentation
 */

export { withCursorAccessors } from '@pixel-brewery/cursor-browser';
export type { ICursorBindingOptions } from './interfaces/ICursorBindingOptions.js';
export type { ICursorTargetOptions } from './interfaces/ICursorTargetOptions.js';
export { cursorSurface } from './actions/cursorSurface.js';
export { cursorTarget } from './actions/cursorTarget.js';
export { provideCursor } from './context/provideCursor.js';
export { useCursorAccessorRegistry } from './context/useCursorAccessorRegistry.js';
