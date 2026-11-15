/**
 * Returns the element's composed path to the attached surface, including both ends.
 *
 * @param surface - The attached surface.
 * @param element - The guided element.
 * @returns The inclusive path, or an empty array if the element is outside the surface.
 * @internal
 */
export function composedPathToSurface(surface: HTMLElement, element: HTMLElement): Element[] {
    const path: Element[] = [];
    for (let current: Element | null = element; current; current = composedParent(current)) {
        path.push(current);
        if (current === surface) return path;
    }
    return [];
}

function composedParent(element: Element): Element | null {
    if (element.assignedSlot) return element.assignedSlot;
    if (element.parentElement) return element.parentElement;
    const root = element.getRootNode();
    const shadowRoot = element.ownerDocument.defaultView?.ShadowRoot;
    return shadowRoot && root instanceof shadowRoot ? root.host : null;
}
