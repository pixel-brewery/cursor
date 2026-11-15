/**
 * Checks whether a registered target is rendered within the attached surface.
 *
 * @param surface - The attached surface.
 * @param element - The registered target.
 * @returns Whether the target is available for presentation.
 *
 * @internal
 */
export function isVisibleElement(surface: HTMLElement, element: HTMLElement): boolean {
    if (!surface.isConnected || !surface.contains(element) || !element.getClientRects().length) {
        return false;
    }
    return (
        element.checkVisibility?.({ visibilityProperty: true, opacityProperty: true }) ??
        element.ownerDocument.defaultView?.getComputedStyle(element).visibility === 'visible'
    );
}
