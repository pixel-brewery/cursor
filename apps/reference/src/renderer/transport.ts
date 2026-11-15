import type { ICursorParticipant, ICursorTransport } from '@pixel-brewery/cursor-core';

type ReferenceEvents = {
    onConnect(participant: ICursorParticipant, transport: ICursorTransport): void;
    onCount(count: number): void;
    onDisconnect(): void;
};

/** Connects the reference view to its loopback relay and refreshes identity after reconnect. */
export function connectReference(events: ReferenceEvents, host: 'browser' | 'electron'): () => void {
    const url = new URL('/cursor', location.href);
    url.protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    url.searchParams.set('host', host);
    let socket: WebSocket | undefined;
    let retry: number | undefined;
    let closed = false;
    let delay = 250;
    const listeners = new Set<(event: unknown) => void>();
    const transport: ICursorTransport = {
        publish(event) {
            if (socket?.readyState === WebSocket.OPEN && socket.bufferedAmount < 64_000) {
                socket.send(JSON.stringify(event));
            }
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };

    function connect(): void {
        const connection = new WebSocket(url);
        socket = connection;
        connection.addEventListener('message', ({ data }: MessageEvent<string>) => {
            if (closed || connection !== socket) return;
            let message: unknown;
            try {
                message = JSON.parse(data);
            } catch {
                return;
            }
            if (!message || typeof message !== 'object' || !('kind' in message)) return;
            if (message.kind === 'welcome' && 'participant' in message) {
                const participant = message.participant;
                if (participant && typeof participant === 'object' && 'id' in participant && 'label' in participant &&
                    typeof participant.id === 'string' && typeof participant.label === 'string') {
                    delay = 250;
                    events.onConnect({ id: participant.id, label: participant.label, source: 'human' }, transport);
                }
            } else if (message.kind === 'participants' && 'count' in message && typeof message.count === 'number') {
                events.onCount(message.count);
            } else {
                for (const listener of listeners) listener(message);
            }
        });
        connection.addEventListener('close', () => {
            if (closed || connection !== socket) return;
            for (const listener of listeners) listener({ kind: 'disconnected' });
            events.onDisconnect();
            retry = window.setTimeout(connect, delay);
            delay = Math.min(delay * 2, 4000);
        });
    }

    connect();
    return () => {
        closed = true;
        window.clearTimeout(retry);
        listeners.clear();
        socket?.close();
    };
}
