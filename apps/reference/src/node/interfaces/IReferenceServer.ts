/**
 * The running HTTP server and WebSocket relay for the demo.
 *
 * @internal
 */
export interface IReferenceServer {
    /**
     * Loopback origin serving the demo.
     *
     * @readonly
     */
    readonly origin: string;

    /**
     * Terminates peer sockets and stops accepting HTTP connections.
     *
     * @returns A promise that settles when both listeners close.
     */
    close(): Promise<void>;
}
