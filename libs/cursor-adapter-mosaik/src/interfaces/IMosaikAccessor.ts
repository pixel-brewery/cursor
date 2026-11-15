import type { IMosaikElementAccess } from './IMosaikElementAccess.js';

/**
 * The generated accessor exported by a component subpath.
 *
 * @typeParam TInteraction - Additional interaction capabilities inferred by the generator.
 * @public
 */
export interface IMosaikAccessor<TInteraction extends object = object> {
    /** The Web Component tag recorded by the manifest. */
    readonly tagName: string;

    /**
     * Binds the accessor to an instance mounted by the host framework.
     * @param element - The mounted instance of this Web Component.
     * @returns Operations for that element.
     */
    bind(element: HTMLElement): IMosaikElementAccess & TInteraction;
}
