// #region Imports

import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import {
    createCursorController,
    type CursorCommand,
    type CursorResult,
    type ICursorController,
    type ICursorParticipant,
    type ICursorTransport,
} from '@pixel-brewery/cursor-core';
import { connectReference } from '../transport/connectReference.js';
import { referenceViewId } from '../../contracts/referenceViewId.js';

// #endregion

const targetId = 'settings';
const actionId = 'open-settings';
const messages: Record<CursorResult['status'], string> = {
    shown: 'Pointing to Settings.',
    invoked: 'Settings opened.',
    denied: 'The action was denied.',
    unavailable: 'Settings is unavailable in this view.',
    cancelled: 'The assistant action was cancelled.',
    failed: 'The settings action failed.',
};

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
    private readonly _show = this.getElement('#show');
    private readonly _open = this.getElement('#open');
    private readonly _assistantStatus = this.getElement('#assistant-status');
    private readonly _connection = this.getElement('#connection');
    private readonly _stop: () => void;
    private _opens = 0;
    private _label = '';
    private _controller: ICursorController | undefined;
    private _releaseSurface: (() => void) | undefined;
    private _running = false;

    // #endregion

    // #region Ctor

    /**
     * Binds the current reference markup and connects it to the demo relay.
     *
     * @param host - Host label sent to the relay. Electron suppresses the browser tab action.
     * @throws When required elements are absent from the reference markup.
     */
    public constructor(host: 'browser' | 'electron') {
        this._settings.addEventListener('click', this.openSettings);
        this.getElement('#close-settings').addEventListener('click', () => {
            this._panel.hidden = true;
            this._settings.setAttribute('aria-expanded', 'false');
        });
        this._show.addEventListener('click', () => void this.run({ kind: 'show', targetId }));
        this._open.addEventListener(
            'click',
            () => void this.run({ kind: 'invoke', targetId, actionId }),
        );
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
                this._releaseSurface?.();
                this._stop();
            },
            { once: true },
        );
    }

    // #endregion

    // #region Methods

    private getElement(selector: string): HTMLElement {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) throw new Error(`Missing reference element ${selector}`);
        return element;
    }

    private readonly openSettings = (): void => {
        this._opens += 1;
        this._panel.dataset.openCount = String(this._opens);
        this._panel.hidden = false;
        this._settings.setAttribute('aria-expanded', 'true');
    };

    private updateActions(): void {
        for (const button of [this._show, this._open])
            button.toggleAttribute('disabled', !this._controller || this._running);
    }

    private async run(command: CursorCommand): Promise<void> {
        if (!this._controller || this._running) return;
        const active = this._controller;
        this._running = true;
        this.updateActions();
        this._assistantStatus.setAttribute('header', 'Moving to Settings…');
        try {
            const result = await active.run(command);
            if (this._controller === active)
                this._assistantStatus.setAttribute('header', messages[result.status]);
        } finally {
            this._running = false;
            this.updateActions();
        }
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
        this.updateActions();
    };

    private readonly onCount = (count: number): void => {
        this._connection.setAttribute(
            'header',
            `${this._label} connected · ${count} ${count === 1 ? 'participant' : 'participants'}`,
        );
        this._connection.setAttribute('data-connected', String(count));
    };

    private readonly onDisconnect = (): void => {
        this._releaseSurface?.();
        this._releaseSurface = undefined;
        this._controller = undefined;
        this.updateActions();
        this._connection.setAttribute('header', 'Disconnected. Reconnecting…');
        this._connection.removeAttribute('data-connected');
        this._assistantStatus.setAttribute('header', 'Choose an assistant action.');
    };

    // #endregion
}
