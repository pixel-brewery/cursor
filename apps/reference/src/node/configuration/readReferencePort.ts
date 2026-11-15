/**
 * Reads the reference port supplied by the web or Electron entry point.
 *
 * @param value - Optional port override. Omit it to use 4317.
 * @returns A valid non-privileged TCP port.
 * @throws When the override lies outside 1024 through 65535 or is not an integer.
 * @internal
 */
export function readReferencePort(value?: string): number {
    const port = value === undefined ? 4317 : Number(value);
    if (!Number.isInteger(port) || port < 1024 || port > 65535) {
        throw new Error('CURSOR_REFERENCE_PORT must be a user port from 1024 to 65535.');
    }
    return port;
}
