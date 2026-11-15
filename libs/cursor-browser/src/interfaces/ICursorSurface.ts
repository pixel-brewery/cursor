/**
 * A mounted cursor overlay and its target registrations.
 *
 * @public
 */
export interface ICursorSurface {
    /**
     * Registers a live element under its stable host target ID.
     *
     * @param id - The unique target ID supplied to assistant commands and anchored pointer events.
     * @param element - A rendered element within the attached surface.
     * @returns An idempotent cleanup function for this registration. Releasing an active target
     * cancels its presentation and removes the assistant marker.
     * @throws {Error} If the element lies outside the surface, the attachment or controller is
     * disposed, or the identifier is invalid or already registered on the controller.
     *
     * @public
     */
    registerTarget(id: string, element: HTMLElement): () => void;

    /**
     * Withdraws the local pointer, removes the overlay and releases subscriptions, listeners,
     * observers and target registrations. Cancels an active presentation.
     *
     * @remarks Call on unmount or before replacing the host view or controller. Repeated calls
     * have no effect. The caller continues to own the controller.
     *
     * @public
     */
    dispose(): void;
}
