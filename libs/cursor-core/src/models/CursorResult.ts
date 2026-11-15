/**
 * Observed outcome of a guided command.
 *
 * @public
 */
export type CursorResult =
    | {
          /**
           * Completion or refusal without an exception.
           *
           * @remarks Shown means the target was presented. Invoked means the
           * authorized handler completed. Denied means policy did not allow
           * the invocation. Unavailable means a registration, live target or
           * execution slot was missing. Cancelled means the request stopped
           * before completion.
           */
          readonly status: 'shown' | 'invoked' | 'denied' | 'unavailable' | 'cancelled';
      }
    | {
          /**
           * Presentation, authorization or action execution raised an error.
           */
          readonly status: 'failed';

          /**
           * Original exception for host-side diagnostics. Host code decides
           * what to report to users and how to recover.
           */
          readonly error: unknown;
      };
