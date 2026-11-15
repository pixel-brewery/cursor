// #region Imports

import type { ICursorAccessorClass } from '../interfaces/ICursorAccessorClass.js';
import type { ICursorElementAccessor } from '../interfaces/ICursorElementAccessor.js';
import type { ICursorFeature } from '../interfaces/ICursorFeature.js';

// #endregion

/**
 * Resolves the accessor classes selected for one application.
 *
 * @public
 */
export class CursorAccessorRegistry {
    // #region Fields

    private readonly _accessors = new Map<string, ICursorAccessorClass>();

    // #endregion

    // #region Ctor

    /**
     * Registers the classes supplied by the application features.
     *
     * @param features - The selected accessor features.
     * @throws If two different classes claim the same tag.
     */
    public constructor(...features: readonly ICursorFeature[]) {
        for (const feature of features) {
            for (const accessor of feature.accessors) {
                const tagName = accessor.tagName;
                const current = this._accessors.get(tagName);
                if (current && current !== accessor) {
                    throw new Error(`Multiple Cursor accessors were configured for <${tagName}>.`);
                }
                this._accessors.set(tagName, accessor);
            }
        }
    }

    // #endregion

    // #region Methods

    /**
     * Looks up a configured class by tag name.
     *
     * @param tagName - The local tag name of a DOM element.
     * @returns The accessor class, if the host configured it.
     */
    public get(tagName: string): ICursorAccessorClass | undefined {
        return this._accessors.get(tagName);
    }

    /**
     * Binds the configured accessor for the element's tag.
     *
     * @param element - The mounted element to bind.
     * @returns The accessor instance, if the host configured the tag.
     */
    public bind(element: HTMLElement): ICursorElementAccessor | undefined;

    /**
     * Binds a known class and keeps its component-specific type.
     *
     * @typeParam TAccessor - The expected bound accessor type.
     * @param element - The mounted element to bind.
     * @param expected - The class the host configured for this element.
     * @returns The bound accessor instance.
     * @throws If the class was not configured for the element's tag.
     */
    public bind<TAccessor extends ICursorElementAccessor>(
        element: HTMLElement,
        expected: ICursorAccessorClass<TAccessor>,
    ): TAccessor;

    public bind(
        element: HTMLElement,
        expected?: ICursorAccessorClass,
    ): ICursorElementAccessor | undefined {
        const accessor = this.get(element.localName);
        if (expected && accessor !== expected) {
            throw new Error(`The expected Cursor accessor is not configured for <${element.localName}>.`);
        }
        return accessor ? new accessor(element) : undefined;
    }

    // #endregion
}
