/**
 * Select the next unselected, enabled option in list order or an option by its exact value.
 *
 * @public
 */
export type OptionSelection =
    | {
          /** Advance to the next enabled, unselected option, wrapping at the end of the list. */
          readonly kind: 'next';
      }
    | {
          /** Select a specific option. */
          readonly kind: 'value';
          /** The exact value of the option to activate. */
          readonly value: string;
      };
