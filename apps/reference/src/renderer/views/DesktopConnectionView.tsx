// #region Imports

import { SelectElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { JSX } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import {
    localConnectionSchema,
    type DesktopConnectionBridge,
    type DesktopConnectionState,
} from '../../contracts/DesktopConnection.js';

// #endregion

interface IDesktopConnectionViewProps {
    readonly bridge: DesktopConnectionBridge;
    readonly onState: (state: DesktopConnectionState) => void;
}

interface IConnectionDraft {
    readonly provider: string | null;
    readonly model: string;
    readonly providerId: string;
    readonly authMethod: string;
}

interface IConnectionSession {
    revision: number;
    busy: boolean;
    state: DesktopConnectionState | undefined;
    pollTimer: number | undefined;
}

const emptyDraft: IConnectionDraft = {
    provider: null,
    model: '',
    providerId: '',
    authMethod: '',
};

const statusLabels: Record<DesktopConnectionState['status'], string> = {
    unchecked: 'Prüfe die gespeicherte Modellverbindung.',
    missing: 'Die gewählte CLI wurde auf diesem Rechner nicht gefunden.',
    'signed-out': 'Die CLI ist verfügbar. Melde dich an, um den Assistenten zu verwenden.',
    ready: 'Die Modellverbindung ist bereit.',
    error: 'Die Modellverbindung konnte nicht geprüft werden.',
};

const loading = 'Verbindung wird geladen …';
const checking = 'Verbindung wird geprüft …';

function activeLogin(state: DesktopConnectionState | undefined) {
    const login = state?.login;
    return login?.state === 'waiting' || login?.state === 'running' ? login : undefined;
}

function loginInputs(container: HTMLDivElement | null) {
    return container?.querySelectorAll<
        HTMLElementTagNameMap['mosaik-textbox' | 'mosaik-passwordbox']
    >('mosaik-textbox, mosaik-passwordbox') ?? [];
}

function clearLoginInputs(container: HTMLDivElement | null): void {
    for (const input of loginInputs(container)) input.value = '';
}

/**
 * Presents the desktop-owned model connection and native authentication flow.
 *
 * @param props - The preload bridge and the receiver for its current connection state.
 * @returns The native connection settings and current sign-in interaction.
 * @internal
 */
export function DesktopConnectionView(props: IDesktopConnectionViewProps): JSX.Element {
    const { bridge, onState } = props;
    const [intl] = useState(() => {
        const messages = new SelectElementIntl('de');
        messages.toggleLabel = 'Auswahl öffnen';
        return messages;
    });
    const [expanded, setExpanded] = useState(false);
    const [draft, setDraft] = useState(emptyDraft);
    const [state, setState] = useState<DesktopConnectionState>();
    const [pending, setPending] = useState<string | undefined>(loading);
    const [notice, setNotice] = useState<string>();
    const [loginMethod, setLoginMethod] = useState<string | null>(null);
    const [submittedInteraction, setSubmittedInteraction] = useState<string>();
    const session = useRef<IConnectionSession | null>(null);
    const fields = useRef<HTMLDivElement | null>(null);
    // Keep authentication responses in the input elements until submission.
    const bindFields = useCallback((element: HTMLDivElement | null) => {
        if (!element) return;
        fields.current = element;
        return () => {
            clearLoginInputs(element);
            if (fields.current === element) fields.current = null;
        };
    }, []);

    const updateState = useCallback((current: IConnectionSession, next: DesktopConnectionState) => {
        current.state = next;
        setState(next);
        setLoginMethod((previous) => next.methods.some((method) => method.id === previous)
            ? previous
            : next.methods[0]?.id ?? null);
        onState(next);
    }, [onState]);

    const schedulePoll = useCallback((current: IConnectionSession) => {
        // A command may replace the login interaction while a poll is in flight.
        const revision = current.revision;
        const isCurrent = () => session.current === current && current.revision === revision;

        function schedule(): void {
            if (activeLogin(current.state)) {
                current.pollTimer = window.setTimeout(() => void refresh(), 500);
            }
        }

        async function refresh(): Promise<void> {
            if (!isCurrent()) return;
            try {
                const next = await bridge.getState();
                if (!isCurrent()) return;
                updateState(current, next);
            } catch {
                if (!isCurrent()) return;
                setNotice('Der Status der Anmeldung konnte nicht gelesen werden.');
            }
            schedule();
        }

        schedule();
    }, [bridge, updateState]);

    const perform = useCallback(async (
        message: string,
        operation: () => Promise<DesktopConnectionState | void>,
    ): Promise<void> => {
        const current = session.current;
        if (!current || current.busy) return;
        window.clearTimeout(current.pollTimer);
        current.revision += 1;
        current.busy = true;
        setPending(message);
        setNotice(undefined);
        try {
            const next = await operation();
            if (next && session.current === current) updateState(current, next);
        } catch {
            if (session.current === current) {
                setNotice('Der Vorgang ist fehlgeschlagen. Versuche es erneut.');
            }
        } finally {
            current.busy = false;
            if (session.current === current) {
                setPending(undefined);
                schedulePoll(current);
            }
        }
    }, [schedulePoll, updateState]);

    useEffect(() => {
        const current: IConnectionSession = {
            revision: 0,
            busy: false,
            state: undefined,
            pollTimer: undefined,
        };
        session.current = current;
        setState(undefined);
        setDraft(emptyDraft);
        setLoginMethod(null);
        setSubmittedInteraction(undefined);
        setExpanded(false);

        async function initialize(): Promise<void> {
            await perform(loading, async () => {
                const next = await bridge.getState();
                if (session.current !== current) return;

                const selection = next.connection;
                setDraft({
                    provider: selection?.provider ?? null,
                    model: selection?.model ?? '',
                    providerId: selection?.provider === 'opencode' ? selection.providerId : '',
                    authMethod: selection?.provider === 'opencode' ? selection.authMethod : '',
                });
                return next;
            });
            if (session.current !== current) return;

            const login = activeLogin(current.state);
            if (current.state?.status !== 'ready' || login) setExpanded(true);
            if (current.state?.connection && current.state.status === 'unchecked' && !login) {
                await perform(checking, () => bridge.check());
            }
        }

        void initialize();
        return () => {
            session.current = null;
            window.clearTimeout(current.pollTimer);
            clearLoginInputs(fields.current);
        };
    }, [bridge, perform]);

    const login = activeLogin(state);
    const interaction = login?.interaction;
    const interactionKey = interaction && login ? `${login.operationId}:${interaction.id}` : undefined;
    const needsInput = !!interaction?.fields.length && submittedInteraction !== interactionKey;
    const busy = pending !== undefined;
    const locked = busy || !!login;
    const openCode = draft.provider === 'opencode';
    const model = draft.model.trim();
    const selection = state?.connection;
    const saved = !!selection && selection.provider === draft.provider &&
        (selection.model ?? '') === model &&
        (selection.provider !== 'opencode' ||
            (selection.providerId === draft.providerId.trim() &&
                selection.authMethod === draft.authMethod.trim()));

    function save(): void {
        const parsed = localConnectionSchema.safeParse(openCode
            ? { provider: draft.provider, model, providerId: draft.providerId, authMethod: draft.authMethod }
            : { provider: draft.provider, ...(model ? { model } : {}) });
        if (!parsed.success) {
            setNotice(openCode
                ? 'Gib die OpenCode-Anbieter-ID, das Modell als Anbieter/Modell und den genauen Namen der Anmeldemethode an.'
                : 'Gib eine gültige Modell-ID ein oder lass das Modellfeld leer.');
            return;
        }
        void perform('Modellverbindung wird gespeichert und geprüft …', () => bridge.save(parsed.data));
    }

    function respond(): void {
        if (!login || !interaction || !needsInput) return;
        const current = session.current;
        const values = Object.fromEntries(
            [...loginInputs(fields.current)].flatMap(({ dataset, value }) =>
                dataset.loginField && value.trim() ? [[dataset.loginField, value] as const] : [],
            ),
        );
        if (!Object.keys(values).length || interaction.fields.some((field) =>
            field.required && !Object.hasOwn(values, field.id)
        )) {
            setNotice('Fülle die angeforderten Anmeldefelder aus.');
            return;
        }

        void perform('Anmeldeantwort wird gesendet …', async () => {
            setSubmittedInteraction(interactionKey);
            clearLoginInputs(fields.current);
            try {
                return await bridge.respondLogin({
                    operationId: login.operationId,
                    interactionId: interaction.id,
                    values,
                });
            } catch (error) {
                if (session.current === current) setSubmittedInteraction(undefined);
                throw error;
            }
        });
    }

    const loginState = state?.login?.state;
    const status = pending ?? notice ?? (
        login ? 'Die native Anmeldung läuft.' :
            loginState === 'cancelled' ? 'Die Anmeldung wurde abgebrochen.' :
            loginState === 'failed' ? 'Die native Anmeldung ist fehlgeschlagen.' :
            state?.connection ? statusLabels[state.status] : 'Wähle eine lokale CLI aus.'
    );
    const variant = notice || loginState === 'failed' || state?.status === 'error'
        ? 'warning'
        : state?.status === 'ready' && !busy && !login ? 'success' : 'info';

    return (
        <section id="desktop-connection" class="desktop-connection" aria-label="Lokale Modellverbindung">
            <div>
                <mosaik-button
                    id="config-open"
                    data-testid="config-open"
                    label="Modellverbindung"
                    appearance="outline"
                    aria-controls="config-panel"
                    aria-expanded={expanded}
                    onClick={() => setExpanded((previous) => !previous)}
                />
            </div>
            <mosaik-card id="config-panel" data-testid="config-panel" appearance="outline" hidden={!expanded}>
                <mosaik-card-header>
                    <mosaik-card-title text="Lokale Modellverbindung" />
                </mosaik-card-header>
                <mosaik-card-content>
                    <div class="connection-fields">
                        <mosaik-select
                            id="config-provider"
                            data-testid="config-provider"
                            label="CLI"
                            placeholder="CLI auswählen"
                            required
                            intl={intl}
                            value={draft.provider}
                            disabled={locked}
                            onchanged={(event) => {
                                if (event.detail.propertyName === 'value') {
                                    const { value } = event.currentTarget;
                                    setDraft((previous) => previous.provider === value
                                        ? previous
                                        : { ...previous, provider: value });
                                }
                            }}
                        >
                            <mosaik-select-item data-testid="config-provider-codex" value="codex" label="Codex" />
                            <mosaik-select-item data-testid="config-provider-claude" value="claude" label="Claude Code" />
                            <mosaik-select-item data-testid="config-provider-opencode" value="opencode" label="OpenCode" />
                        </mosaik-select>
                        <mosaik-textbox
                            id="config-model"
                            data-testid="config-model"
                            label={openCode ? 'Modell-ID (Anbieter/Modell)' : 'Modell (optional)'}
                            maxlength={120}
                            value={draft.model}
                            disabled={locked}
                            required={openCode}
                            onInput={(event) => {
                                const { value } = event.currentTarget;
                                setDraft((previous) => ({ ...previous, model: value }));
                            }}
                        />
                        <div id="config-opencode-fields" class="connection-fields connection-fields-wide" hidden={!openCode}>
                            <mosaik-textbox
                                id="config-opencode-provider"
                                data-testid="config-opencode-provider"
                                label="OpenCode-Anbieter-ID"
                                maxlength={120}
                                value={draft.providerId}
                                disabled={locked}
                                required
                                onInput={(event) => {
                                    const { value } = event.currentTarget;
                                    setDraft((previous) => ({ ...previous, providerId: value }));
                                }}
                            />
                            <mosaik-textbox
                                id="config-opencode-method"
                                data-testid="config-opencode-method"
                                label="Native OpenCode-Anmeldemethode"
                                maxlength={120}
                                value={draft.authMethod}
                                disabled={locked}
                                required
                                onInput={(event) => {
                                    const { value } = event.currentTarget;
                                    setDraft((previous) => ({ ...previous, authMethod: value }));
                                }}
                            />
                        </div>
                        <div class="connection-actions connection-fields-wide">
                            <mosaik-button
                                id="config-save"
                                data-testid="config-save"
                                label="Speichern"
                                variant="primary"
                                appearance="solid"
                                disabled={locked || !draft.provider || saved}
                                onClick={save}
                            />
                            <mosaik-button
                                id="config-check"
                                data-testid="config-check"
                                label="Verbindung prüfen"
                                appearance="outline"
                                disabled={locked || !saved}
                                onClick={() => void perform(checking, () => bridge.check())}
                            />
                        </div>
                        <mosaik-message
                            id="config-status"
                            class="connection-fields-wide"
                            data-testid="config-status"
                            data-status={state?.status}
                            appearance="soft"
                            aria-live="polite"
                            header={status}
                            variant={variant}
                        />
                    </div>
                </mosaik-card-content>
                <mosaik-card-content id="config-login-choices" hidden={!saved || !!login || !state?.methods.length}>
                    <div class="connection-fields">
                        <mosaik-select
                            id="config-login-method"
                            data-testid="config-login-method"
                            label="Anmeldemethode"
                            placeholder="Methode auswählen"
                            intl={intl}
                            value={loginMethod}
                            disabled={locked}
                            onchanged={(event) => {
                                if (event.detail.propertyName === 'value') {
                                    setLoginMethod(event.currentTarget.value);
                                }
                            }}
                        >
                            {state?.methods.map((method) => (
                                <mosaik-select-item
                                    key={method.id}
                                    value={method.id}
                                    label={method.label}
                                    data-testid={`config-login-method-${method.id}`}
                                />
                            ))}
                        </mosaik-select>
                        <div class="connection-actions">
                            <mosaik-button
                                id="config-login"
                                data-testid="config-login"
                                label="Anmelden"
                                appearance="outline"
                                disabled={locked || !loginMethod}
                                onClick={() => {
                                    if (saved && loginMethod) {
                                        void perform('Anmeldung wird gestartet …', () => bridge.startLogin(loginMethod));
                                    }
                                }}
                            />
                        </div>
                    </div>
                </mosaik-card-content>
                <mosaik-card-content id="config-login-flow" hidden={!login}>
                    <div class="connection-fields">
                        <p
                            id="config-login-instructions"
                            class="connection-fields-wide"
                            data-testid="config-login-instructions"
                            aria-live="polite"
                        >
                            {interaction?.message ?? 'Warte auf die Anweisungen der CLI.'}
                        </p>
                        <p id="config-login-code-row" class="connection-fields-wide" hidden={!interaction?.code}>
                            Anmeldecode <code id="config-login-code" data-testid="config-login-code">{interaction?.code}</code>
                        </p>
                        <div
                            key={interactionKey}
                            id="config-login-fields"
                            ref={bindFields}
                            class="connection-fields connection-fields-wide"
                            hidden={!needsInput}
                        >
                            {interaction?.fields.map((field) => field.secret ? (
                                <mosaik-passwordbox
                                    key={field.id}
                                    data-login-field={field.id}
                                    data-testid={`config-login-field-${field.id}`}
                                    label={field.label}
                                    required={field.required ?? false}
                                    autocomplete={false}
                                    disabled={busy}
                                />
                            ) : (
                                <mosaik-textbox
                                    key={field.id}
                                    data-login-field={field.id}
                                    data-testid={`config-login-field-${field.id}`}
                                    label={field.label}
                                    required={field.required ?? false}
                                    autocomplete={false}
                                    disabled={busy}
                                    maxlength={4096}
                                />
                            ))}
                        </div>
                        <div class="connection-actions connection-fields-wide">
                            <mosaik-button
                                id="config-login-open"
                                data-testid="config-login-open"
                                label="Anmeldeseite im Browser öffnen"
                                appearance="outline"
                                hidden={!interaction?.hasUrl}
                                disabled={busy}
                                onClick={() => void perform('Anmeldeseite wird geöffnet …', () => bridge.openLogin())}
                            />
                            <mosaik-button
                                id="config-login-submit"
                                data-testid="config-login-submit"
                                label="Anmeldeantwort senden"
                                variant="primary"
                                appearance="solid"
                                hidden={!needsInput}
                                disabled={busy}
                                onClick={respond}
                            />
                            <mosaik-button
                                id="config-login-cancel"
                                data-testid="config-login-cancel"
                                label="Anmeldung abbrechen"
                                appearance="plain"
                                disabled={busy}
                                onClick={() => void perform('Anmeldung wird abgebrochen …', () => {
                                    clearLoginInputs(fields.current);
                                    return bridge.cancelLogin();
                                })}
                            />
                        </div>
                    </div>
                </mosaik-card-content>
            </mosaik-card>
        </section>
    );
}
