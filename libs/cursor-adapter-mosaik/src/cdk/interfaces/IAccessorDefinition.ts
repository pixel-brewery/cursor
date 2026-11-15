/**
 * The custom element tag and the public members available to a decorated accessor.
 *
 * @public
 */
export interface IAccessorDefinition {
    /** The tag of the custom element accepted by the accessor. */
    readonly tagName: string;

    /** The public property names the accessor can read. */
    readonly properties: readonly string[];

    /** The subset of public properties that the accessor cannot write. */
    readonly readOnlyProperties: readonly string[];

    /** The public method names the accessor can invoke. */
    readonly methods: readonly string[];

    /** The event names the accessor can observe. */
    readonly events: readonly string[];
}
