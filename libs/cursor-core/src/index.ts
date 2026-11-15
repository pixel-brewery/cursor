/**
 * Framework-neutral pointer transport and guided-action contracts for a host view.
 *
 * @packageDocumentation
 */

export { createCursorController } from './services/CursorController.js';
export { parsePointerUpdate } from './parsePointerUpdate.js';
export type { CursorCommand } from './models/CursorCommand.js';
export type { CursorResult } from './models/CursorResult.js';
export type { CursorTransportEvent } from './models/CursorTransportEvent.js';
export type { ICursorAction } from './interfaces/ICursorAction.js';
export type { ICursorController } from './interfaces/ICursorController.js';
export type { ICursorControllerOptions } from './interfaces/ICursorControllerOptions.js';
export type { ICursorParticipant } from './interfaces/ICursorParticipant.js';
export type { ICursorPosition } from './interfaces/ICursorPosition.js';
export type { ICursorTransport } from './interfaces/ICursorTransport.js';
export type { IPointer } from './interfaces/IPointer.js';
export type { IPointerUpdate } from './models/IPointerUpdate.js';
