import type { ICursorSurface } from '@pixel-brewery/cursor-browser';

/** Operations on one live Mosaik element. The host decides which operations it authorizes. @public */
export interface IMosaikElementAccess {
    /** Read a public property declared by the component. @param property - Manifest property name. @returns The current value. */
    read(property: string): unknown;

    /** Set a writable public property. @param property - Manifest property name. @param value - Value accepted by the component. */
    write(property: string, value: unknown): void;

    /** Call a public method. @param method - Manifest method name. @param args - Method arguments. @returns The component's result, which may be a promise. */
    invoke(method: string, ...args: unknown[]): unknown;

    /** Observe a declared component event. @param event - Manifest event name. @param listener - Host listener. @returns A function that removes the listener. */
    observe(event: string, listener: EventListener): () => void;

    /** Guide to and click an actionable part of the component. @param surface - Active cursor surface. @param signal - Guided action cancellation. @param target - Optional explicit element inside the component when it has multiple controls. */
    activate(surface: ICursorSurface, signal: AbortSignal, target?: HTMLElement): Promise<void>;
}
