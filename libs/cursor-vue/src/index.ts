/**
 * Vue providers and composables for configuring Cursor and registering template refs.
 *
 * @packageDocumentation
 */

export { withCursorAccessors } from '@pixel-brewery/cursor-browser';
export { CursorProvider } from './context/CursorProvider.js';
export type { ICursorProviderProps } from './context/ICursorProviderProps.js';
export { provideCursor } from './context/provideCursor.js';
export { useCursorAccessorRegistry } from './composables/useCursorAccessorRegistry.js';
export { useCursorSurface } from './composables/useCursorSurface.js';
export { useCursorTarget } from './composables/useCursorTarget.js';
