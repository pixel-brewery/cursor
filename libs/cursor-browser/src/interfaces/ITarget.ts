/**
 * A live target element and its registration cleanup.
 *
 * @internal
 */
export interface ITarget {
    readonly element: HTMLElement;
    readonly release: () => void;
}
