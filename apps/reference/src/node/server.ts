import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parsePointerUpdate } from '@pixel-brewery/cursor-core';
import type { CursorTransportEvent, ICursorParticipant } from '@pixel-brewery/cursor-core';
import { preview } from 'vite';
import { WebSocket, WebSocketServer } from 'ws';

const root = fileURLToPath(new URL('../../', import.meta.url));
export const viewId = 'reference';
export const referenceOrigin = 'http://127.0.0.1:4317';

type ReferenceServer = {
    readonly origin: string;
    close(): Promise<void>;
};

/** Serves the built renderer and relays scoped pointer updates on loopback. */
export async function startReferenceServer(port = 4317): Promise<ReferenceServer> {
    const server = await preview({
        root,
        preview: { host: '127.0.0.1', port, strictPort: true },
        plugins: [{
            name: 'cursor-reference-health',
            configurePreviewServer(previewServer) {
                previewServer.middlewares.use('/_cursor-reference', (_request, response) => {
                    response.setHeader('Content-Type', 'text/plain');
                    response.end('cursor-reference');
                });
            },
        }],
    });
    const origin = `http://127.0.0.1:${port}`;
    const sockets = new WebSocketServer({ noServer: true, maxPayload: 2048 });
    const peers = new Map<WebSocket, ICursorParticipant>();
    let browserCount = 0;
    let electronCount = 0;

    server.httpServer.on('upgrade', (request, socket, head) => {
        const url = new URL(request.url ?? '/', origin);
        if (request.headers.origin !== origin || url.pathname !== '/cursor') {
            socket.destroy();
            return;
        }
        sockets.handleUpgrade(request, socket, head, (connection) => {
            const label = url.searchParams.get('host') === 'electron'
                ? `Electron ${++electronCount}`
                : `Browser ${++browserCount}`;
            const participant = { id: randomUUID(), label, source: 'human' as const };
            peers.set(connection, participant);
            connection.send(JSON.stringify({ kind: 'welcome', participant }));
            broadcast({ kind: 'participants', count: peers.size });

            connection.on('message', (data, binary) => {
                if (binary) return;
                let message: unknown;
                try {
                    message = JSON.parse(data.toString());
                } catch {
                    return;
                }
                const update = parsePointerUpdate(message);
                if (update?.viewId === viewId) {
                    broadcast({ ...update, participant, generation: 1 }, connection);
                }
            });

            connection.on('error', () => connection.terminate());
            connection.on('close', () => {
                if (!peers.delete(connection)) return;
                broadcast({ kind: 'departure', actorId: participant.id, viewId, generation: 1 }, connection);
                broadcast({ kind: 'participants', count: peers.size });
            });
        });
    });

    function broadcast(event: CursorTransportEvent | { kind: 'participants'; count: number }, exclude?: WebSocket): void {
        const data = JSON.stringify(event);
        for (const socket of peers.keys()) {
            if (socket !== exclude && socket.readyState === WebSocket.OPEN && socket.bufferedAmount < 64_000) {
                socket.send(data);
            }
        }
    }

    return {
        origin,
        async close() {
            for (const socket of peers.keys()) socket.terminate();
            await new Promise<void>((resolve, reject) => sockets.close((error) => error ? reject(error) : resolve()));
            await new Promise<void>((resolve, reject) =>
                server.httpServer.close((error) => error ? reject(error) : resolve()));
        },
    };
}
