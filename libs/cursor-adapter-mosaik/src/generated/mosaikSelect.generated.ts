// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

export const mosaikSelectTag = 'mosaik-select';
export const mosaikSelectItemTag = 'mosaik-select-item';

export interface IMosaikSelectItemElement extends HTMLElement {
    readonly disabled: boolean;
    readonly value: unknown;
}

export interface IMosaikSelectElement extends HTMLElement {
    readonly disabled: boolean;
    readonly isDropDownOpen: boolean;
    readonly items: readonly IMosaikSelectItemElement[];
    readonly selectedItem: IMosaikSelectItemElement | null;
    readonly value: string | null;
    open(): void;
    close(): void;
}
