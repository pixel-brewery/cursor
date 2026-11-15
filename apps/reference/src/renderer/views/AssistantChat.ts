// #region Imports

import {
    ChatMessageElement,
    PromptBoxElementIntl,
    type ChatElement,
    type ChatPromptBoxElement,
} from '@pixel-brewery/mosaik-elements-foundation';
import type { CursorResult } from '@pixel-brewery/cursor-core';
import type { ChatMessage } from '../../contracts/ChatMessage.js';
import { chatReplySchema, type ChatReply } from '../../contracts/chat.js';

// #endregion

const actionStatus: Record<CursorResult['status'], string> = {
    shown: 'Der KI-Cursor zeigt auf die Einstellungen.',
    invoked: 'Die Einstellungen sind geöffnet.',
    denied: 'Die App hat die Aktion abgelehnt.',
    unavailable: 'Das Bedienelement ist in dieser Ansicht nicht verfügbar.',
    cancelled: 'Die Aktion wurde abgebrochen.',
    failed: 'Die Einstellungen konnten nicht geöffnet werden.',
};

/**
 * Owns the page-local conversation, model request, and action feedback.
 *
 * @internal
 */
export class AssistantChat {
    // #region Fields

    private readonly _lifecycle = new AbortController();
    private readonly _history: ChatMessage[] = [];
    private _request: AbortController | undefined;
    private _connected = false;
    private _disposed = false;

    // #endregion

    // #region Ctor

    /**
     * Connects the Mosaik chat to the local model relay and the view's action handler.
     *
     * @param _chat - Transcript that renders the current view's conversation.
     * @param _prompt - Editor that submits messages and permits cancellation.
     * @param _status - App feedback for the current request and its action result.
     * @param _run - Resolves an allowed suggestion against the active view.
     */
    public constructor(
        private readonly _chat: ChatElement,
        private readonly _prompt: ChatPromptBoxElement,
        private readonly _status: HTMLElement,
        private readonly _run: (
            action: Exclude<ChatReply['action'], 'none'>,
            signal: AbortSignal,
        ) => Promise<CursorResult>,
    ) {
        const intl = new PromptBoxElementIntl('de');
        intl.submitLabel = 'Senden';
        intl.stopLabel = 'Abbrechen';
        this._prompt.intl = intl;
        this._prompt.queueOnBusy = false;
        this._chat.begin = 'end';
        const options = { signal: this._lifecycle.signal };
        this._prompt.addEventListener(
            'promptSubmitted',
            (event: Event) => {
                const detail: unknown = event instanceof CustomEvent ? event.detail : undefined;
                if (
                    detail &&
                    typeof detail === 'object' &&
                    'value' in detail &&
                    typeof detail.value === 'string'
                ) {
                    void this.send(detail.value.trim());
                }
            },
            options,
        );
        this._prompt.addEventListener('stopRequested', () => this._request?.abort(), options);
    }

    // #endregion

    // #region Methods

    /**
     * Enables requests for an active view or cancels the request on disconnect.
     *
     * @param connected - Whether a local cursor controller is active.
     */
    public setConnected(connected: boolean): void {
        if (this._disposed) return;
        this._connected = connected;
        this._prompt.disabled = !connected;
        if (!connected) this._request?.abort();
    }

    /** Releases chat subscriptions and cancels any pending model request or cursor action. */
    public dispose(): void {
        this._disposed = true;
        this._request?.abort();
        this._lifecycle.abort();
    }

    private async send(content: string): Promise<void> {
        if (this._disposed || !this._connected || this._request || !content) return;

        const request = new AbortController();
        this._request = request;
        this._prompt.isBusy = true;
        const user: ChatMessage = { role: 'user', content };
        this.append(user);
        this.setStatus('Antwort wird erstellt …');
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...this._history, user] }),
                signal: request.signal,
            });
            if (!response.ok) {
                this.restorePrompt(content);
                this.setStatus(
                    response.status === 429
                        ? 'Das Modell ist ausgelastet. Sende die Nachricht gleich noch einmal.'
                        : 'Keine Modellantwort. Prüfe den lokalen Modellserver und sende erneut.',
                    'warning',
                );
                return;
            }
            const reply = chatReplySchema.parse(await response.json());
            request.signal.throwIfAborted();

            const assistant: ChatMessage = { role: 'assistant', content: reply.text };
            this._history.push(user, assistant);
            this._history.splice(0, Math.max(0, this._history.length - 8));
            this.append(assistant);

            if (reply.action === 'none') {
                this._status.hidden = true;
                return;
            }
            this.setStatus('Der KI-Cursor bewegt sich …');
            const result = await this._run(reply.action, request.signal);
            if (!this._disposed) this.setStatus(actionStatus[result.status]);
        } catch {
            if (!this._disposed) {
                this.restorePrompt(content);
                this.setStatus(
                    request.signal.aborted
                        ? 'Anfrage abgebrochen.'
                        : 'Die Antwort konnte nicht geladen werden.',
                    request.signal.aborted ? 'neutral' : 'warning',
                );
            }
        } finally {
            this._request = undefined;
            if (!this._disposed) this._prompt.isBusy = false;
        }
    }

    private restorePrompt(content: string): void {
        if (!this._prompt.value) this._prompt.value = content;
    }

    private append({ role, content }: ChatMessage): void {
        const node = new ChatMessageElement();
        node.slot = 'message';
        node.text = content;
        node.author = role === 'user' ? 'Du' : 'Assistent';
        node.reply = role === 'user';
        node.appearance = 'soft';
        node.dataset.testid = role === 'user' ? 'assistant-user-message' : 'assistant-reply';
        this._chat.append(node);
        const messages = this._chat.querySelectorAll('[slot="message"]');
        if (messages.length > 40) messages[0]?.remove();
        if (role === 'user') void this._chat.scrollToLatest();
    }

    private setStatus(label: string, variant: 'neutral' | 'warning' = 'neutral'): void {
        this._status.setAttribute('header', label);
        this._status.setAttribute('variant', variant);
        this._status.hidden = false;
    }

    // #endregion
}
