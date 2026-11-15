/**
 * Request to present a registered target or invoke its bound host action.
 *
 * @remarks Requests address the controller's active view. Only an invoke
 * request enters the host action policy.
 *
 * @public
 */
export type CursorCommand =
    | {
          /**
           * Present the target as a visual guide.
           */
          readonly kind: 'show';

          /**
           * Target identifier from the current view's registrations.
           */
          readonly targetId: string;
      }
    | {
          /**
           * Present the target, authorize the action and invoke its handler.
           */
          readonly kind: 'invoke';

          /**
           * Target identifier that must match the action registration.
           */
          readonly targetId: string;

          /**
           * Identifier of the host action to execute.
           */
          readonly actionId: string;

          /**
           * Optional payload passed to the host for validation.
           */
          readonly input?: unknown;
      };
