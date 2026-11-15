/**
 * React configuration and hooks for attaching a Cursor surface and registering targets.
 *
 * @packageDocumentation
 */

export { useCursorSurface } from './hooks/useCursorSurface.js';
export { useCursorTarget } from './hooks/useCursorTarget.js';
export { CursorProvider } from './providers/CursorProvider.js';
export type { ICursorProviderProps } from './providers/ICursorProviderProps.js';
export { useCursorAccessorRegistry } from './hooks/useCursorAccessorRegistry.js';
export { withCursorAccessors } from '@pixel-brewery/cursor-browser';
