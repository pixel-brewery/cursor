// #region Imports

import {
    PromptBoxElementIntl,
    type ChatElement,
    type ChatPromptBoxElement,
} from '@pixel-brewery/mosaik-elements-foundation';
import type { CursorResult } from '@pixel-brewery/cursor-core';
import type { JSX } from 'preact';
import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import type { ChatMessage } from '../../contracts/ChatMessage.js';
import type { ChatReply } from '../../contracts/chat.js';
import { demoCommands, isDemoAction } from '../../contracts/DemoActions.js';
import type { DesktopConnectionBridge } from '../../contracts/DesktopConnection.js';
import { requestChatReply } from '../transport/requestChatReply.js';

// #endregion

const actionStatus: Record<CursorResult['status'], string> = {
    shown: 'Der KI-Cursor zeigt auf die Einstellungen.',
    invoked: 'Die Einstellungen sind geöffnet.',
    denied: 'Die App hat die Aktion abgelehnt.',
    unavailable: 'Das Bedienelement ist in dieser Ansicht nicht verfügbar.',
    cancelled: 'Die Aktion wurde abgebrochen.',
    failed: 'Die Aktion konnte nicht ausgeführt werden.',
};
const demoTargets = {
    region: 'die Regionsauswahl',
    table: 'die Datentabelle',
    checkbox: 'die Checkbox „Vorschau anzeigen“',
};

function describeActionStatus(
    action: Exclude<ChatReply['action'], 'none'>,
    status: CursorResult['status'],
): string {
    if (isDemoAction(action) && (status === 'shown' || status === 'invoked')) {
        const command = demoCommands[action];
        return status === 'shown' || command.kind === 'show'
            ? `Der KI-Cursor zeigt auf ${demoTargets[command.target]}.`
            : 'Die Demo-Aktion ist ausgeführt.';
    }
    if (status === 'invoked' && action !== 'open-settings') return 'Der Zeigerstil ist eingestellt.';
    return actionStatus[status];
}

const nextStyleShortcuts = new Set([
    'ändere den zeigerstil',
    'wechsle den zeigerstil',
    'wechsle zum nächsten zeigerstil',
]);
const nextStyleReply: ChatReply = {
    text: 'Ich wechsle zum nächsten Zeigerstil.',
    action: 'cycle-cursor-style',
};

interface IAssistantChatProps {
    readonly connected: boolean;
    readonly conversationKey: string | undefined;
    readonly desktop: DesktopConnectionBridge | undefined;
    readonly run: (
        action: Exclude<ChatReply['action'], 'none'>,
        signal: AbortSignal,
    ) => Promise<CursorResult>;
}

interface ITranscriptEntry extends ChatMessage {
    readonly id: number;
}

interface IChatStatus {
    readonly header: string;
    readonly variant: 'neutral' | 'warning';
}

/**
 * Owns the page-local conversation, model request, and action feedback.
 *
 * @param props - Host connectivity, conversation identity, and action runner.
 * @returns The assistant transcript, prompt, and request status.
 * @internal
 */
export function AssistantChat(props: IAssistantChatProps): JSX.Element {
    const { connected, conversationKey, desktop, run } = props;
    const chat = useRef<ChatElement>(null);
    const prompt = useRef<ChatPromptBoxElement>(null);
    const pendingRequest = useRef<AbortController | undefined>(undefined);
    const history = useRef<ChatMessage[]>([]);
    const previousConversation = useRef(conversationKey);
    const conversationRevision = useRef(0);
    const nextEntryId = useRef(0);

    const [entries, setEntries] = useState<ITranscriptEntry[]>([]);
    const [status, setStatus] = useState<IChatStatus>();
    const [busy, setBusy] = useState(false);
    const [promptIntl] = useState(() => {
        const intl = new PromptBoxElementIntl('de');
        intl.submitLabel = 'Senden';
        intl.stopLabel = 'Abbrechen';
        return intl;
    });

    useLayoutEffect(() => {
        if (
            previousConversation.current !== undefined &&
            previousConversation.current !== conversationKey
        ) {
            conversationRevision.current += 1;
            pendingRequest.current?.abort();
            history.current = [];
            setEntries([]);
            setStatus(undefined);
        }
        previousConversation.current = conversationKey;
        if (!connected) pendingRequest.current?.abort();
    }, [connected, conversationKey]);

    useLayoutEffect(
        () => () => {
            const request = pendingRequest.current;
            pendingRequest.current = undefined;
            request?.abort();
        },
        [],
    );

    const lastSubmittedId = entries.findLast((entry) => entry.role === 'user')?.id;
    useLayoutEffect(() => {
        if (lastSubmittedId !== undefined) void chat.current?.scrollToLatest();
    }, [lastSubmittedId]);

    function append(message: ChatMessage): void {
        const entry = { ...message, id: nextEntryId.current++ };
        setEntries((current) => [...current, entry].slice(-40));
    }

    async function send(content: string): Promise<void> {
        if (!connected || pendingRequest.current || !content) return;

        const request = new AbortController();
        const revision = conversationRevision.current;
        const isCurrent = () =>
            pendingRequest.current === request && conversationRevision.current === revision;
        pendingRequest.current = request;
        setBusy(true);
        const user: ChatMessage = { role: 'user', content };
        append(user);
        setStatus({ header: 'Antwort wird erstellt …', variant: 'neutral' });
        try {
            const shortcut = content.toLocaleLowerCase('de').replace(/[.!?]+$/u, '').trimEnd();
            const reply = nextStyleShortcuts.has(shortcut)
                ? nextStyleReply
                : await requestChatReply(desktop, [...history.current, user], request.signal);
            request.signal.throwIfAborted();

            const assistant: ChatMessage = { role: 'assistant', content: reply.text };
            history.current = [...history.current, user, assistant].slice(-8);
            append(assistant);

            if (reply.action === 'none') {
                setStatus(undefined);
                return;
            }
            setStatus({ header: 'Der KI-Cursor bewegt sich …', variant: 'neutral' });
            const result = await run(reply.action, request.signal);
            if (isCurrent()) {
                setStatus({
                    header: describeActionStatus(reply.action, result.status),
                    variant: 'neutral',
                });
            }
        } catch (error) {
            if (isCurrent()) {
                if (prompt.current && !prompt.current.value) prompt.current.value = content;
                setStatus({
                    header: request.signal.aborted
                        ? 'Anfrage abgebrochen.'
                        : desktop
                          ? 'Keine Modellantwort. Prüfe die lokale Verbindung.'
                          : error instanceof Error && error.cause === 429
                            ? 'Das Modell ist ausgelastet. Sende die Nachricht gleich noch einmal.'
                            : 'Keine Modellantwort. Prüfe den lokalen Modellserver und sende erneut.',
                    variant: request.signal.aborted ? 'neutral' : 'warning',
                });
            }
        } finally {
            if (pendingRequest.current === request) {
                pendingRequest.current = undefined;
                setBusy(false);
            }
        }
    }

    function handleSubmit(event: Event): void {
        const detail: unknown = event instanceof CustomEvent ? event.detail : undefined;
        if (
            detail &&
            typeof detail === 'object' &&
            'value' in detail &&
            typeof detail.value === 'string'
        ) {
            void send(detail.value.trim());
        }
    }

    function choosePrompt(content: string): void {
        const input = prompt.current;
        if (!connected || !input) return;

        if (!input.value) input.value = content;
        input.focus();
    }

    return (
        <mosaik-card appearance="outline">
            <mosaik-card-header>
                <mosaik-card-title text="Assistent" />
                <mosaik-card-sub-title text="Aktionen in dieser Ansicht" />
            </mosaik-card-header>
            <mosaik-card-content>
                <mosaik-chat
                    ref={chat}
                    id="assistant-chat"
                    class="assistant-chat"
                    data-testid="assistant-chat"
                    aria-label="Chatverlauf"
                    aria-live="polite"
                    begin="end"
                    scrollToEnd
                >
                    <mosaik-empty-state
                        slot="empty"
                        class="assistant-empty"
                        header="Erste Nachricht"
                        content="Wähle einen Vorschlag."
                        icon="chat"
                        iconSize="large"
                    >
                        <div slot="actions" class="assistant-suggestions">
                            <mosaik-button
                                data-testid="assistant-suggest-show"
                                label="Einstellungen zeigen"
                                appearance="outline"
                                disabled={!connected}
                                onClick={() => choosePrompt('Zeig mir die Einstellungen')}
                            />
                            <mosaik-button
                                data-testid="assistant-suggest-style"
                                label="Zeigerstil wechseln"
                                appearance="outline"
                                disabled={!connected}
                                onClick={() => choosePrompt('Wechsle zum nächsten Zeigerstil')}
                            />
                        </div>
                    </mosaik-empty-state>
                    <mosaik-chat-prompt-box
                        ref={prompt}
                        id="assistant-input"
                        slot="input"
                        data-testid="assistant-input"
                        aria-label="Nachricht"
                        placeholder="Nachricht eingeben …"
                        maxlength={700}
                        maxRows={3}
                        intl={promptIntl}
                        queueOnBusy={false}
                        isBusy={busy}
                        disabled={!connected}
                        onpromptSubmitted={handleSubmit}
                        onstopRequested={() => pendingRequest.current?.abort()}
                    >
                        <mosaik-button
                            data-testid="assistant-send"
                            slot="submit"
                            label="Senden"
                            variant="primary"
                            appearance="solid"
                        />
                    </mosaik-chat-prompt-box>
                    {entries.map(({ id, role, content }) => (
                        <mosaik-chat-message
                            key={id}
                            slot="message"
                            author={role === 'user' ? 'Du' : 'Assistent'}
                            text={content}
                            reply={role === 'user'}
                            appearance="soft"
                            data-testid={role === 'user' ? 'assistant-user-message' : 'assistant-reply'}
                        />
                    ))}
                </mosaik-chat>
            </mosaik-card-content>
            <mosaik-card-footer hidden={!status}>
                <mosaik-message
                    id="assistant-status"
                    data-testid="assistant-status"
                    appearance="soft"
                    aria-live="polite"
                    header={status?.header ?? ''}
                    variant={status?.variant ?? 'neutral'}
                />
            </mosaik-card-footer>
        </mosaik-card>
    );
}
