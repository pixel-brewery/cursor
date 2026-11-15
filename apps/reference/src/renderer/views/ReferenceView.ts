// #region Imports

import {
    SelectElementIntl,
    type ChatElement,
    type ChatPromptBoxElement,
    type SelectElement,
} from '@pixel-brewery/mosaik-elements-foundation';
import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import {
    createCursorController,
    type CursorResult,
    type ICursorController,
    type ICursorParticipant,
    type ICursorTransport,
} from '@pixel-brewery/cursor-core';
import { connectReference } from '../transport/connectReference.js';
import { referenceViewId } from '../../contracts/referenceViewId.js';
import type { ChatReply } from '../../contracts/chat.js';
import type { DesktopConnectionState } from '../../contracts/DesktopConnection.js';
import { AssistantChat } from './AssistantChat.js';
import { DesktopConnectionView } from './DesktopConnectionView.js';

// #endregion

const targetId = 'settings';
const actionId = 'open-settings';

/**
 * Owns the settings interaction and cursor registrations for one reference page.
 *
 * @internal
 */
export class ReferenceView {
    // #region Fields

    private readonly _surface = this.getElement('#surface');
    private readonly _settings = this.getElement('#settings');
    private readonly _panel = this.getElement('#settings-panel');
    private readonly _connection = this.getElement('#connection');
    private readonly _assistant: AssistantChat;
    private readonly _desktop: DesktopConnectionView | undefined;
    private readonly _stop: () => void;
    private _opens = 0;
    private _label = '';
    private _controller: ICursorController | undefined;
    private _releaseSurface: (() => void) | undefined;
    private _modelReady: boolean;
    private _modelContext: string | undefined;

    // #endregion

    // #region Ctor

    /**
     * Binds the current reference markup and connects it to the demo relay.
     *
     * @param host - Host label sent to the relay. Electron suppresses the browser tab action.
     * @throws When required elements are absent from the reference markup.
     */
    public constructor(host: 'browser' | 'electron') {
        const bridge = window.cursorDesktop;
        this._modelReady = !bridge;
        this._assistant = new AssistantChat(
            this.getElement<ChatElement>('#assistant-chat'),
            this.getElement<ChatPromptBoxElement>('#assistant-input'),
            this.getElement('#assistant-status'),
            (action, signal) => this.run(action, signal),
            bridge,
        );
        if (bridge) {
            this._desktop = new DesktopConnectionView(bridge, (state) => this.onModelState(state));
        }
        this._settings.addEventListener('click', this.openSettings);
        this.getElement('#close-settings').addEventListener('click', () => {
            this._panel.hidden = true;
            this._settings.setAttribute('aria-expanded', 'false');
        });
        const pointerStyle = this.getElement<SelectElement>('#cursor-style');
        const selectIntl = new SelectElementIntl('de');
        selectIntl.toggleLabel = 'Zeigerstile öffnen';
        pointerStyle.intl = selectIntl;
        pointerStyle.addEventListener('changed', (event: Event) => {
            const detail: unknown = event instanceof CustomEvent ? event.detail : undefined;
            if (
                detail &&
                typeof detail === 'object' &&
                'propertyName' in detail &&
                detail.propertyName === 'value'
            ) {
                // The Select also clears on Escape when its menu is already closed.
                pointerStyle.value ??= this._surface.dataset.cursorStyle ?? 'pill';
                this._surface.dataset.cursorStyle = pointerStyle.value;
            }
        });
        const anotherView = this.getElement('[data-testid="another-view"]');
        anotherView.hidden = host === 'electron';
        anotherView.addEventListener('click', () =>
            window.open(location.origin, '_blank', 'noopener'),
        );

        this._stop = connectReference(
            {
                onConnect: this.onConnect,
                onCount: this.onCount,
                onDisconnect: this.onDisconnect,
            },
            host,
        );
        window.addEventListener(
            'pagehide',
            () => {
                this._assistant.dispose();
                this._desktop?.dispose();
                this._releaseSurface?.();
                this._stop();
            },
            { once: true },
        );
    }

    // #endregion

    // #region Methods

    private getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
        const element = document.querySelector<T>(selector);
        if (!element) throw new Error(`Missing reference element ${selector}`);
        return element;
    }

    private readonly openSettings = (): void => {
        this._opens += 1;
        this._panel.dataset.openCount = String(this._opens);
        this._panel.hidden = false;
        this._settings.setAttribute('aria-expanded', 'true');
    };

    private onModelState(state: DesktopConnectionState): void {
        const context = JSON.stringify([state.connection, state.login?.operationId]);
        if (this._modelContext !== undefined && this._modelContext !== context) {
            this._assistant.resetConversation();
        }
        this._modelContext = context;
        const loginPending = state.login?.state === 'running' || state.login?.state === 'waiting';
        this._modelReady = state.status === 'ready' && !loginPending;
        this._assistant.setConnected(Boolean(this._controller) && this._modelReady);
    }

    private async run(
        action: Exclude<ChatReply['action'], 'none'>,
        signal: AbortSignal,
    ): Promise<CursorResult> {
        if (!this._controller) return { status: 'unavailable' };
        return this._controller.run(
            action === 'show-settings'
                ? { kind: 'show', targetId }
                : { kind: 'invoke', targetId, actionId },
            signal,
        );
    }

    private readonly onConnect = (
        participant: ICursorParticipant,
        transport: ICursorTransport,
    ): void => {
        this._label = participant.label;
        const active = createCursorController({
            viewId: referenceViewId,
            participant,
            generation: 1,
            transport,
            authorize: (command) => command.actionId === actionId && command.targetId === targetId,
        });
        const attached = attachCursorSurface({
            surface: this._surface,
            controller: active,
            showLocalPointer: true,
        });
        const unregisterTarget = attached.registerTarget(targetId, this._settings);
        const unregisterAction = active.registerAction({
            id: actionId,
            targetId,
            handler: this.openSettings,
        });
        this._controller = active;
        this._releaseSurface = () => {
            unregisterAction();
            unregisterTarget();
            attached.dispose();
            active.dispose();
        };
        this._assistant.setConnected(this._modelReady);
    };

    private readonly onCount = (count: number): void => {
        this._connection.setAttribute('header', `${this._label} verbunden · ${count} online`);
        this._connection.setAttribute('data-connected', String(count));
    };

    private readonly onDisconnect = (): void => {
        this._assistant.setConnected(false);
        this._releaseSurface?.();
        this._releaseSurface = undefined;
        this._controller = undefined;
        this._connection.setAttribute('header', 'Verbindung getrennt. Neuer Versuch …');
        this._connection.removeAttribute('data-connected');
    };

    // #endregion
}
