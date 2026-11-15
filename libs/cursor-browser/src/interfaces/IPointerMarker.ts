/**
 * The DOM nodes owned by one rendered pointer marker.
 *
 * @internal
 */
export interface IPointerMarker {
    readonly root: HTMLElement;
    readonly tip: HTMLElement;
    readonly label: HTMLElement;
}
