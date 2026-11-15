/**
 * The DOM nodes owned by one rendered pointer marker.
 *
 * @internal
 */
export interface IPointerMarker {
    readonly root: HTMLElement;
    readonly tip: HTMLElement;
    readonly outline: HTMLElement;
    readonly fill: HTMLElement;
    readonly label: HTMLElement;
    paletteKey?: string;
}
