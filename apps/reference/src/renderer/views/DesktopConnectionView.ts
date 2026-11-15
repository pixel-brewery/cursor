// #region Imports

import { SelectElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import {
    localConnectionSchema,
    type DesktopConnectionBridge,
    type DesktopConnectionState,
} from '../../contracts/DesktopConnection.js';

// #endregion

type DesktopLogin = NonNullable<DesktopConnectionState['login']>;
type LoginInteraction = NonNullable<DesktopLogin['interaction']>;

const statusLabels: Record<DesktopConnectionState['status'], string> = {
    unchecked: 'Prüfe die gespeicherte Modellverbindung.',
    missing: 'Die gewählte CLI wurde auf diesem Rechner nicht gefunden.',
    'signed-out': 'Die CLI ist verfügbar. Melde dich an, um den Assistenten zu verwenden.',
    ready: 'Die Modellverbindung ist bereit.',
    error: 'Die Modellverbindung konnte nicht geprüft werden.',
};

/**
 * Presents the desktop-owned model connection and native authentication flow.
 *
 * @internal
 */
export class DesktopConnectionView {
    // #region Fields

    private readonly _lifecycle = new AbortController();
    private readonly _container = this.element('section', 'desktop-connection');
    private readonly _toggle = this.element('mosaik-button', 'config-open');
    private readonly _panel = this.element('mosaik-card', 'config-panel');
    private readonly _provider = this.element('mosaik-select', 'config-provider');
    private readonly _model = this.element('mosaik-textbox', 'config-model');
    private readonly _openCodeFields = this.element('div', 'config-opencode-fields');
    private readonly _openCodeProvider = this.element('mosaik-textbox', 'config-opencode-provider');
    private readonly _openCodeMethod = this.element('mosaik-textbox', 'config-opencode-method');
    private readonly _save = this.element('mosaik-button', 'config-save');
    private readonly _check = this.element('mosaik-button', 'config-check');
    private readonly _status = this.element('mosaik-message', 'config-status');
    private readonly _loginChoices = this.element('mosaik-card-content', 'config-login-choices');
    private readonly _loginMethod = this.element('mosaik-select', 'config-login-method');
    private readonly _login = this.element('mosaik-button', 'config-login');
    private readonly _loginFlow = this.element('mosaik-card-content', 'config-login-flow');
    private readonly _instructions = this.element('p', 'config-login-instructions');
    private readonly _codeRow = this.element('p', 'config-login-code-row');
    private readonly _code = this.element('code', 'config-login-code');
    private readonly _fields = this.element('div', 'config-login-fields');
    private readonly _open = this.element('mosaik-button', 'config-login-open');
    private readonly _submit = this.element('mosaik-button', 'config-login-submit');
    private readonly _cancel = this.element('mosaik-button', 'config-login-cancel');
    private readonly _methodTemplate = this.element('template', 'config-login-method-template');
    private readonly _inputTemplate = this.element('template', 'config-login-input-template');
    private readonly _inputs = new Map<
        string,
        HTMLElementTagNameMap['mosaik-textbox' | 'mosaik-passwordbox']
    >();

    private _state: DesktopConnectionState | undefined;
    private _pending: string | undefined;
    private _pollTimer: number | undefined;
    private _revision = 0;
    private _interactionKey: string | undefined;
    private _submittedKey: string | undefined;
    private _notice: string | undefined;

    // #endregion

    // #region Ctor

    /**
     * Enables Electron's local connection controls and loads the saved selection.
     *
     * @param _bridge - Renderer capabilities exposed by Electron's preload script.
     * @param _onState - Receives each state read from the desktop service.
     * @throws When required reference markup is missing.
     */
    public constructor(
        private readonly _bridge: DesktopConnectionBridge,
        private readonly _onState: (state: DesktopConnectionState) => void,
    ) {
        const intl = new SelectElementIntl('de');
        intl.toggleLabel = 'Auswahl öffnen';
        this._provider.intl = intl;
        this._loginMethod.intl = intl;
        this._container.hidden = false;

        const options = { signal: this._lifecycle.signal };
        this._toggle.addEventListener('click', () => this.setExpanded(Boolean(this._panel.hidden)), options);
        const populateControls = () => this.renderControls();
        const selectionChanged = (event: Event) => {
            const detail: unknown = event instanceof CustomEvent ? event.detail : undefined;
            if (detail && typeof detail === 'object' && 'propertyName' in detail && detail.propertyName === 'value') {
                this.renderControls();
            }
        };
        this._provider.addEventListener('changed', selectionChanged, options);
        this._loginMethod.addEventListener('changed', selectionChanged, options);
        this._model.addEventListener('input', populateControls, options);
        this._openCodeProvider.addEventListener('input', populateControls, options);
        this._openCodeMethod.addEventListener('input', populateControls, options);
        this._save.addEventListener('click', () => this.save(), options);
        this._check.addEventListener('click', () => {
            void this.perform('Verbindung wird geprüft …', () => this._bridge.check());
        }, options);
        this._login.addEventListener('click', () => this.startLogin(), options);
        this._open.addEventListener('click', () => {
            void this.perform('Anmeldeseite wird geöffnet …', () => this._bridge.openLogin());
        }, options);
        this._submit.addEventListener('click', () => this.respond(), options);
        this._cancel.addEventListener('click', () => {
            this.clearInputs();
            void this.perform('Anmeldung wird abgebrochen …', () => this._bridge.cancelLogin());
        }, options);
        void this.initialize();
    }

    // #endregion

    // #region Methods

    /** Releases event listeners and timers and blanks any in-memory native input fields. */
    public dispose(): void {
        this._lifecycle.abort();
        window.clearTimeout(this._pollTimer);
        this.clearInputs();
    }

    private element<TKey extends keyof HTMLElementTagNameMap>(
        tag: TKey,
        id: string,
    ): HTMLElementTagNameMap[TKey] {
        const element = document.querySelector<HTMLElementTagNameMap[TKey]>(`${tag}#${id}`);
        if (!element) throw new Error(`Missing desktop connection element ${id}`);
        return element;
    }

    private setExpanded(expanded: boolean): void {
        this._panel.hidden = !expanded;
        this._toggle.setAttribute('aria-expanded', String(expanded));
    }

    private cloneControl<TKey extends keyof HTMLElementTagNameMap>(
        source: HTMLTemplateElement,
        tag: TKey,
    ): HTMLElementTagNameMap[TKey] {
        const control = document.importNode(source.content, true).querySelector(tag);
        if (!control) throw new Error(`Missing desktop connection template control ${tag}`);
        return control;
    }

    private async initialize(): Promise<void> {
        await this.perform('Verbindung wird geladen …', async () => {
            const state = await this._bridge.getState();
            if (this._lifecycle.signal.aborted) return;

            this._provider.value = state.connection?.provider ?? null;
            this._model.value = state.connection?.model ?? '';
            if (state.connection?.provider === 'opencode') {
                this._openCodeProvider.value = state.connection.providerId;
                this._openCodeMethod.value = state.connection.authMethod;
            }

            return state;
        });
        if (this._lifecycle.signal.aborted) return;

        if (this._state?.status !== 'ready' || this.activeLogin()) this.setExpanded(true);
        if (this._state?.connection && this._state.status === 'unchecked' && !this.activeLogin()) {
            await this.perform('Verbindung wird geprüft …', () => this._bridge.check());
        }
    }

    private save(): void {
        const provider = this._provider.value;
        const model = this._model.value.trim();
        const selection = localConnectionSchema.safeParse(
            provider === 'opencode'
                ? {
                    provider,
                    model,
                    providerId: this._openCodeProvider.value,
                    authMethod: this._openCodeMethod.value,
                }
                : { provider, ...(model ? { model } : {}) },
        );
        if (!selection.success) {
            this._notice = provider === 'opencode'
                ? 'Gib die OpenCode-Anbieter-ID, das Modell als Anbieter/Modell und den genauen Namen der Anmeldemethode an.'
                : 'Gib eine gültige Modell-ID ein oder lass das Modellfeld leer.';
            this.renderStatus();
            return;
        }

        void this.perform('Modellverbindung wird gespeichert und geprüft …', () =>
            this._bridge.save(selection.data),
        );
    }

    private startLogin(): void {
        const method = this._loginMethod.value;
        if (method && this.isSavedSelection()) {
            void this.perform('Anmeldung wird gestartet …', () => this._bridge.startLogin(method));
        }
    }

    private respond(): void {
        const login = this.activeLogin();
        const interaction = login?.interaction;
        const key = this._interactionKey;
        if (!login || !interaction || !key || this._submittedKey === key) return;

        const values = Object.fromEntries(
            [...this._inputs]
                .map(([id, input]) => [id, input.value] as const)
                .filter(([, value]) => value.trim() !== ''),
        );
        if (!Object.keys(values).length || interaction.fields.some((field) =>
            field.required && !Object.hasOwn(values, field.id)
        )) {
            this._notice = 'Fülle die angeforderten Anmeldefelder aus.';
            this.renderStatus();
            return;
        }

        this._submittedKey = key;
        this.clearInputs();
        void this.perform('Anmeldeantwort wird gesendet …', async () => {
            try {
                return await this._bridge.respondLogin({
                    operationId: login.operationId,
                    interactionId: interaction.id,
                    values,
                });
            } catch (error) {
                this._submittedKey = undefined;
                throw error;
            }
        });
    }

    private async perform(
        text: string,
        operation: () => Promise<DesktopConnectionState | void>,
    ): Promise<void> {
        if (this._pending || this._lifecycle.signal.aborted) return;

        window.clearTimeout(this._pollTimer);
        this._revision++;
        this._pending = text;
        this._notice = undefined;
        this.renderControls();
        this.renderStatus();
        try {
            const state = await operation();
            if (state && !this._lifecycle.signal.aborted) this.setState(state);
        } catch {
            this._notice = 'Der Vorgang ist fehlgeschlagen. Versuche es erneut.';
        } finally {
            this._pending = undefined;
            if (!this._lifecycle.signal.aborted) {
                this.renderControls();
                this.renderStatus();
                this.scheduleCheck();
            }
        }
    }

    private scheduleCheck(): void {
        if (!this.activeLogin()) return;

        const revision = this._revision;
        this._pollTimer = window.setTimeout(() => void this.refreshLogin(revision), 500);
    }

    private async refreshLogin(revision: number): Promise<void> {
        if (revision !== this._revision || this._lifecycle.signal.aborted) return;
        try {
            const state = await this._bridge.getState();
            if (revision !== this._revision || this._lifecycle.signal.aborted) return;

            this.setState(state);
            this.renderControls();
            this.renderStatus();
        } catch {
            if (revision !== this._revision || this._lifecycle.signal.aborted) return;

            this._notice = 'Der Status der Anmeldung konnte nicht gelesen werden.';
            this.renderStatus();
        }
        this.scheduleCheck();
    }

    private setState(state: DesktopConnectionState): void {
        const previous = this._state;
        this._state = state;
        this._onState(state);
        this._status.dataset.status = state.status;
        if (!previous || state.methods.length !== previous.methods.length ||
            state.methods.some((method, index) => {
                const last = previous.methods[index];
                return last?.id !== method.id || last.label !== method.label;
            })) {
            const options = state.methods.map((method) => {
                const option = this.cloneControl(this._methodTemplate, 'mosaik-select-item');
                option.value = method.id;
                option.label = method.label;
                option.dataset.testid = `config-login-method-${method.id}`;
                return option;
            });
            this._loginMethod.replaceChildren(...options);
            if (!state.methods.some((method) => method.id === this._loginMethod.value)) {
                this._loginMethod.value = state.methods[0]?.id ?? null;
            }
        }
    }

    private isSavedSelection(): boolean {
        const selection = this._state?.connection;
        if (!selection || selection.provider !== this._provider.value ||
            (selection.model ?? '') !== this._model.value.trim()) return false;

        return selection.provider !== 'opencode' ||
            (selection.providerId === this._openCodeProvider.value.trim() &&
             selection.authMethod === this._openCodeMethod.value.trim());
    }

    private renderControls(): void {
        this.renderLogin();
        const openCode = this._provider.value === 'opencode';
        const activeLogin = this.activeLogin();
        const locked = !!this._pending || !!activeLogin;
        const saved = this.isSavedSelection();
        this._openCodeFields.hidden = !openCode;
        this._model.label = openCode ? 'Modell-ID (Anbieter/Modell)' : 'Modell (optional)';
        this._model.required = openCode;
        this._provider.disabled = locked;
        this._model.disabled = locked;
        this._openCodeProvider.disabled = locked;
        this._openCodeMethod.disabled = locked;
        this._save.disabled = locked || !this._provider.value || saved;
        this._check.disabled = locked || !saved;
        this._loginChoices.hidden = !saved || !!activeLogin || !this._state?.methods.length;
        this._loginMethod.disabled = locked;
        this._login.disabled = locked || !this._loginMethod.value;
        this._open.disabled = !!this._pending;
        this._cancel.disabled = !!this._pending;
        this._submit.disabled = !!this._pending;
        for (const input of this._inputs.values()) input.disabled = !!this._pending;
    }

    private renderStatus(): void {
        const login = this._state?.login;
        const state = this._state;
        this._status.header = this._pending ?? this._notice ?? (
            this.activeLogin() ? 'Die native Anmeldung läuft.' :
                login?.state === 'cancelled' ? 'Die Anmeldung wurde abgebrochen.' :
                login?.state === 'failed' ? 'Die native Anmeldung ist fehlgeschlagen.' :
                state?.connection ? statusLabels[state.status] : 'Wähle eine lokale CLI aus.'
        );
        this._status.variant = this._notice || login?.state === 'failed' || state?.status === 'error'
            ? 'warning'
            : state?.status === 'ready' && !this._pending && !this.activeLogin() ? 'success' : 'info';
    }

    private activeLogin(): DesktopLogin | undefined {
        const login = this._state?.login;
        return login?.state === 'waiting' || login?.state === 'running' ? login : undefined;
    }

    private renderLogin(): void {
        const login = this.activeLogin();
        const interaction = login?.interaction;
        const instruction = interaction?.message ?? 'Warte auf die Anweisungen der CLI.';
        this._loginFlow.hidden = !login;
        if (this._instructions.textContent !== instruction) this._instructions.textContent = instruction;
        this._open.hidden = !interaction?.hasUrl;
        this._codeRow.hidden = !interaction?.code;
        if (this._code.textContent !== (interaction?.code ?? '')) {
            this._code.textContent = interaction?.code ?? '';
        }

        const key = interaction && login ? `${login.operationId}:${interaction.id}` : undefined;
        if (this._interactionKey !== key) {
            this.clearInputs();
            this._inputs.clear();
            this._interactionKey = key;
            this._submittedKey = undefined;
            this._fields.replaceChildren();
            if (interaction) this.renderLoginInputs(interaction);
        }
        const needsInput = !!this._inputs.size && this._submittedKey !== key;
        this._fields.hidden = !needsInput;
        this._submit.hidden = !needsInput;
    }

    private renderLoginInputs(interaction: LoginInteraction): void {
        for (const field of interaction.fields) {
            const input = field.secret
                ? this.cloneControl(this._inputTemplate, 'mosaik-passwordbox')
                : this.cloneControl(this._inputTemplate, 'mosaik-textbox');
            input.label = field.label;
            input.required = field.required ?? false;
            input.autocomplete = false;
            input.dataset.testid = `config-login-field-${field.id}`;
            this._inputs.set(field.id, input);
            this._fields.append(input);
        }
    }

    private clearInputs(): void {
        for (const input of this._inputs.values()) input.value = '';
    }

    // #endregion
}
