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
    return surface.isConnected && surface.contains(element) && isRenderedElement(element);
}

/**
 * Checks whether an element currently has rendered geometry and is visible.
 *
 * @param element - The element to measure.
 * @returns Whether the element is rendered and visible.
 * @internal
 */
export function isRenderedElement(element: HTMLElement): boolean {
    if (!element.isConnected || !element.getClientRects().length) return false;
    return (
        element.checkVisibility?.({ visibilityProperty: true, opacityProperty: true }) ??
        element.ownerDocument.defaultView?.getComputedStyle(element).visibility === 'visible'
    );
}
