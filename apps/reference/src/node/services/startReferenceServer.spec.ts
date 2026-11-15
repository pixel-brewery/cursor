// #region Imports

import { once } from 'node:events';
import { createConnection, createServer } from 'node:net';
import type { ICursorParticipant, IPointerUpdate } from '@pixel-brewery/cursor-core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WebSocket } from 'ws';
import { referenceViewId } from '../../contracts/referenceViewId.js';
import type { IReferenceServer } from '../interfaces/IReferenceServer.js';
import { startReferenceServer } from './startReferenceServer.js';

// #endregion

const move = {
    kind: 'move',
    viewId: referenceViewId,
    participant: { id: 'forged', label: 'Untrusted assistant', source: 'assistant' },
    generation: 7,
    sequence: 12,
    position: { x: 0.2, y: 0.4 },
    targetId: 'settings',
} satisfies IPointerUpdate;

let relay: IReferenceServer | undefined;
const sockets = new Set<WebSocket>();

afterEach(async () => {
    for (const socket of sockets) socket.terminate();
    sockets.clear();
    const running = relay;
    relay = undefined;
    await running?.close();
});

describe('startReferenceServer pointer relay', () => {
    it.each([
        { title: 'an unexpected WebSocket path', path: '/other' },
        { title: 'a foreign browser origin', path: '/cursor', origin: 'http://example.test' },
        { title: 'an absent browser origin', path: '/cursor', origin: '' },
    ])('rejects $title', async ({ path, origin }) => {
        const { origin: serverOrigin } = await openRelay();
        const claimedOrigin = origin ?? serverOrigin;
        const rejected = new WebSocket(webSocketUrl(serverOrigin, path), {
            ...(claimedOrigin ? { origin: claimedOrigin } : {}),
        });
        sockets.add(rejected);
        const opened = vi.fn();
        rejected.on('open', opened);

        const [error] = await once(rejected, 'error');

        expect(error).toBeInstanceOf(Error);
        expect(opened).not.toHaveBeenCalled();
    });

    it('rejects malformed and foreign HTTP upgrade targets and keeps the relay available', async () => {
        const { origin } = await openRelay();
        const endpoint = new URL(origin);

        for (const target of ['http://[', 'http://example.test/cursor']) {
            const socket = createConnection({
                host: endpoint.hostname,
                port: Number(endpoint.port),
            });
            let received = '';
            socket.on('data', (data) => {
                received += data.toString();
            });
            const finished = once(socket, 'close');
            socket.end(
                [
                    `GET ${target} HTTP/1.1`,
                    `Host: ${endpoint.host}`,
                    `Origin: ${origin}`,
                    'Connection: Upgrade',
                    'Upgrade: websocket',
                    'Sec-WebSocket-Version: 13',
                    'Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==',
                    '',
                    '',
                ].join('\r\n'),
            );
            await finished;
            expect(received).not.toContain('101 Switching Protocols');
        }

        const survivor = await connectPeer(origin);
        expect(survivor.participant.source).toBe('human');
    });

    it('relays only valid same-view updates under the actual sender identity', async () => {
        const { origin } = await openRelay();
        const sender = await connectPeer(origin);
        const receiver = await connectPeer(origin);

        sender.socket.send('{');
        sender.socket.send(Buffer.from(JSON.stringify(move)));
        sender.socket.send(JSON.stringify({ ...move, viewId: 'another-view' }));
        sender.socket.send(JSON.stringify({ ...move, position: { x: '0.2', y: 0.4 } }));
        sender.socket.send(
            JSON.stringify({
                kind: 'departure',
                actorId: receiver.participant.id,
                viewId: referenceViewId,
            }),
        );
        sender.socket.send(JSON.stringify(move));

        await vi.waitFor(() =>
            expect(receiver.messages.filter(isRelayUpdate)).toEqual([
                { ...move, participant: sender.participant, generation: 1 },
            ]),
        );
        expect(sender.participant.id).not.toBe(receiver.participant.id);
    });

    it('retires the host-assigned attachment when a participant disconnects', async () => {
        const { origin } = await openRelay();
        const sender = await connectPeer(origin);
        const receiver = await connectPeer(origin);

        sender.socket.close();

        await vi.waitFor(() =>
            expect(receiver.messages).toContainEqual({
                kind: 'departure',
                actorId: sender.participant.id,
                viewId: referenceViewId,
                generation: 1,
            }),
        );
    });
});

async function openRelay(): Promise<IReferenceServer> {
    const probe = createServer();
    probe.listen(0, '127.0.0.1');
    await once(probe, 'listening');
    const address = probe.address();
    await new Promise<void>((resolve, reject) =>
        probe.close((error) => (error ? reject(error) : resolve())),
    );
    if (!address || typeof address === 'string') throw new Error('Expected an ephemeral TCP port.');
    relay = await startReferenceServer(address.port);
    return relay;
}

function webSocketUrl(origin: string, path: string): URL {
    const url = new URL(path, origin);
    url.protocol = 'ws:';
    return url;
}

async function connectPeer(origin: string) {
    const socket = new WebSocket(webSocketUrl(origin, '/cursor'), { origin });
    sockets.add(socket);
    const messages: unknown[] = [];
    socket.on('message', (message) => messages.push(JSON.parse(message.toString()) as unknown));
    await once(socket, 'open');
    const participant = await vi.waitFor(() => {
        const welcome = messages.find((message) => hasKind(message, 'welcome'));
        expect(welcome).toMatchObject({ participant: { id: expect.any(String), source: 'human' } });
        return (welcome as { participant: ICursorParticipant }).participant;
    });
    return { socket, messages, participant };
}

function hasKind(message: unknown, kind: string): boolean {
    return (
        typeof message === 'object' &&
        message !== null &&
        'kind' in message &&
        message.kind === kind
    );
}

function isRelayUpdate(message: unknown): boolean {
    return hasKind(message, 'move') || hasKind(message, 'leave') || hasKind(message, 'departure');
}
