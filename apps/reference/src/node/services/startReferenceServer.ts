// #region Imports

import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
    parsePointerUpdate,
    type CursorTransportEvent,
    type ICursorParticipant,
} from '@pixel-brewery/cursor-core';
import { preview } from 'vite';
import { WebSocket, WebSocketServer } from 'ws';
import { referenceViewId } from '../../contracts/referenceViewId.js';
import { type IReferenceServer } from '../interfaces/IReferenceServer.js';
import { createChatHandler } from './createChatHandler.js';

// #endregion

const root = fileURLToPath(new URL('../../../', import.meta.url));

/**
 * Serves the built renderer, local chat and reference view's pointer relay on loopback.
 *
 * @param port - Local port to bind. It must be unused.
 * @returns The listening origin and the operation to shut down the relay.
 * @throws When the renderer cannot be served or the port cannot be bound.
 * @internal
 */
export async function startReferenceServer(port: number): Promise<IReferenceServer> {
    const origin = `http://127.0.0.1:${port}`;
    const shutdown = new AbortController();
    const handleChat = createChatHandler(origin, shutdown.signal);
    const server = await preview({
        root,
        preview: { host: '127.0.0.1', port, strictPort: true },
        plugins: [
            {
                name: 'cursor-reference-http',
                configurePreviewServer(previewServer) {
                    previewServer.middlewares.use((request, response, next) => {
                        if (request.url === '/api/chat') {
                            void handleChat(request, response).catch(next);
                            return;
                        }
                        next();
                    });
                    previewServer.middlewares.use('/_cursor-reference', (_request, response) => {
                        response.setHeader('Content-Type', 'text/plain');
                        response.end('cursor-reference');
                    });
                },
            },
        ],
    });
    const sockets = new WebSocketServer({ noServer: true, maxPayload: 2048 });
    const peers = new Map<WebSocket, ICursorParticipant>();
    let browserCount = 0;
    let electronCount = 0;

    server.httpServer.on('upgrade', (request, socket, head) => {
        const url = URL.parse(request.url ?? '/', origin);
        if (
            request.headers.origin !== origin ||
            url?.origin !== origin ||
            url.pathname !== '/cursor'
        ) {
            socket.destroy();
            return;
        }
        sockets.handleUpgrade(request, socket, head, (connection) => {
            const label =
                url.searchParams.get('host') === 'electron'
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
                if (update?.viewId === referenceViewId) {
                    broadcast({ ...update, participant, generation: 1 }, connection);
                }
            });

            connection.on('error', () => connection.terminate());
            connection.on('close', () => {
                if (!peers.delete(connection)) return;
                broadcast(
                    {
                        kind: 'departure',
                        actorId: participant.id,
                        viewId: referenceViewId,
                        generation: 1,
                    },
                    connection,
                );
                broadcast({ kind: 'participants', count: peers.size });
            });
        });
    });

    function broadcast(
        event: CursorTransportEvent | { kind: 'participants'; count: number },
        exclude?: WebSocket,
    ): void {
        const data = JSON.stringify(event);
        for (const socket of peers.keys()) {
            if (
                socket !== exclude &&
                socket.readyState === WebSocket.OPEN &&
                socket.bufferedAmount < 64_000
            ) {
                socket.send(data);
            }
        }
    }

    return {
        origin,
        async close() {
            shutdown.abort();
            for (const socket of peers.keys()) socket.terminate();
            await new Promise<void>((resolve, reject) =>
                sockets.close((error) => (error ? reject(error) : resolve())),
            );
            await new Promise<void>((resolve, reject) =>
                server.httpServer.close((error) => (error ? reject(error) : resolve())),
            );
        },
    };
}
