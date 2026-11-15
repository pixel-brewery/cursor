// #region Imports

import type { IAccessorDefinition } from '../interfaces/IAccessorDefinition.js';
import type { ElementAccessor } from './ElementAccessor.js';

// #endregion

const definitions = new WeakMap<typeof ElementAccessor, IAccessorDefinition>();

/**
 * Associates a class with its custom element tag and public member declarations.
 *
 * @param definition - The tag and public members of the element that the class accepts.
 * @returns A class decorator that attaches the definition to the accessor class.
 * @public
 */
export function Accessor(
    definition: IAccessorDefinition,
): (value: typeof ElementAccessor, context: ClassDecoratorContext<typeof ElementAccessor>) => void {
    return (_value, context) => {
        context.addInitializer(function () {
            definitions.set(this, {
                tagName: definition.tagName,
                properties: [...definition.properties],
                readOnlyProperties: [...definition.readOnlyProperties],
                methods: [...definition.methods],
                events: [...definition.events],
            });
        });
    };
}

/**
 * Reads the definition registered for a concrete accessor class.
 *
 * @param accessorClass - The decorated accessor class.
 * @returns The declaration associated with the class.
 * @throws If the class lacks an Accessor decorator.
 * @internal
 */
export function getAccessorDefinition(accessorClass: typeof ElementAccessor): IAccessorDefinition {
    const definition = definitions.get(accessorClass);
    if (!definition) throw new Error(`${accessorClass.name} requires an @Accessor definition.`);
    return definition;
}
