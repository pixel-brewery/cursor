// #region Imports

import { SelectElementIntl, type ElementEvent, type SelectElement } from '@pixel-brewery/mosaik-elements-foundation';
import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import { createCursorController, type CursorResult, type ICursorController } from '@pixel-brewery/cursor-core';
import type { JSX, TargetedEvent } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import cursorMark from '../../../../../.github/assets/cursor-icon.png';
import type { ChatReply } from '../../contracts/chat.js';
import {
    cursorStyleChangeSchema,
    cursorStyleSchema,
    type CursorStyle,
} from '../../contracts/CursorStyle.js';
import type { DesktopConnectionBridge, DesktopConnectionState } from '../../contracts/DesktopConnection.js';
import { referenceViewId } from '../../contracts/referenceViewId.js';
import { connectReference } from '../transport/connectReference.js';
import { AssistantChat } from './AssistantChat.js';
import { DesktopConnectionView } from './DesktopConnectionView.js';

// #endregion

const settingsTarget = 'settings';
const openSettingsAction = 'open-settings';
const styleTarget = 'cursor-style';
const changeStyleAction = 'set-cursor-style';

const cursorStyleLabels: Record<CursorStyle, string> = {
    outline: 'Rund mit Kontur',
    pill: 'Rund',
    square: 'Eckig',
    'square-outline': 'Eckig mit Zeigerkontur',
};

interface IReferenceViewProps {
    readonly desktop: DesktopConnectionBridge | undefined;
}

interface IConnectionStatus {
    readonly label: string;
    readonly count?: number;
}

/**
 * Renders the shared cursor demo and binds its current DOM elements to the active connection.
 *
 * @param props - The native connection bridge when the view runs in Electron.
 * @returns The reference application.
 *
 * @internal
 */
export function ReferenceView(props: IReferenceViewProps): JSX.Element {
    const { desktop } = props;
    const surface = useRef<HTMLElement>(null);
    const settingsButton = useRef<HTMLElementTagNameMap['mosaik-button']>(null);
    const settingsPanel = useRef<HTMLElementTagNameMap['mosaik-card']>(null);
    const styleSelect = useRef<SelectElement>(null);
    const controller = useRef<ICursorController | null>(null);

    const [connection, setConnection] = useState<IConnectionStatus>({ label: 'Verbindung wird aufgebaut …' });
    const [cursorReady, setCursorReady] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [style, setStyle] = useState<CursorStyle>('pill');
    const [modelState, setModelState] = useState<DesktopConnectionState>();

    const styleIntl = useMemo(() => {
        const intl = new SelectElementIntl('de');
        intl.toggleLabel = 'Zeigerstile öffnen';
        return intl;
    }, []);

    const openSettings = useCallback(() => {
        setOpenCount((count) => count + 1);
        setSettingsOpen(true);
    }, []);

    const changeCursorStyle = useCallback((input: unknown) => {
        const selection = cursorStyleChangeSchema.parse(input);
        setStyle((current) => {
            if (selection !== 'next') return selection;
            const styles = cursorStyleSchema.options;
            return styles[(styles.indexOf(current) + 1) % styles.length] ?? 'pill';
        });
    }, []);

    function selectCursorStyle(event: TargetedEvent<SelectElement, ElementEvent<SelectElement, 'changed'>>): void {
        if (event.detail.propertyName !== 'value') return;
        const select = event.currentTarget;
        const selection = cursorStyleSchema.safeParse(select.value);
        if (selection.success) setStyle(selection.data);
        else select.value = style;
    }

    const run = useCallback(async (
        action: Exclude<ChatReply['action'], 'none'>,
        signal: AbortSignal,
    ): Promise<CursorResult> => {
        const active = controller.current;
        if (!active) return { status: 'unavailable' };
        if (action === 'show-settings') {
            return active.run({ kind: 'show', targetId: settingsTarget }, signal);
        }
        const open = { kind: 'invoke', targetId: settingsTarget, actionId: openSettingsAction } as const;
        if (action === 'open-settings') return active.run(open, signal);
        if (settingsPanel.current?.hidden) {
            const result = await active.run(open, signal);
            if (result.status !== 'invoked') return result;
        }
        const input = action === 'cycle-cursor-style'
            ? 'next'
            : cursorStyleSchema.parse(action.slice('set-cursor-style-'.length));
        return active.run({ kind: 'invoke', targetId: styleTarget, actionId: changeStyleAction, input }, signal);
    }, []);

    useEffect(() => {
        const surfaceElement = surface.current;
        const button = settingsButton.current;
        const select = styleSelect.current;
        if (!surfaceElement || !button || !select) return;

        let participantLabel = '';
        let release: (() => void) | undefined;
        const stop = connectReference({
            onConnect(participant, transport) {
                release?.();
                participantLabel = participant.label;
                const active = createCursorController({
                    viewId: referenceViewId,
                    participant,
                    generation: 1,
                    transport,
                    authorize(command) {
                        if (command.targetId === settingsTarget) {
                            return command.actionId === openSettingsAction && command.input === undefined;
                        }
                        return command.targetId === styleTarget &&
                            command.actionId === changeStyleAction &&
                            cursorStyleChangeSchema.safeParse(command.input).success;
                    },
                });
                const attachment = attachCursorSurface({
                    surface: surfaceElement,
                    controller: active,
                    showLocalPointer: true,
                });
                attachment.registerTarget(settingsTarget, button);
                attachment.registerTarget(styleTarget, select);
                active.registerAction({ id: openSettingsAction, targetId: settingsTarget, handler: openSettings });
                active.registerAction({ id: changeStyleAction, targetId: styleTarget, handler: changeCursorStyle });
                controller.current = active;
                setCursorReady(true);

                release = () => {
                    controller.current = null;
                    attachment.dispose();
                    active.dispose();
                };
            },
            onCount(count) {
                setConnection({ label: `${participantLabel} · ${count} online`, count });
            },
            onDisconnect() {
                release?.();
                release = undefined;
                setCursorReady(false);
                setConnection({ label: 'Verbindung getrennt. Neuer Versuch …' });
            },
        }, desktop ? 'electron' : 'browser');

        return () => {
            release?.();
            stop();
        };
    }, [desktop, openSettings, changeCursorStyle]);

    const loginPending = modelState?.login?.state === 'running' || modelState?.login?.state === 'waiting';
    const modelReady = !desktop || (modelState?.status === 'ready' && !loginPending);
    const conversationKey = modelState && JSON.stringify([modelState.connection, modelState.login?.operationId]);
    const pointerHint = connection.count === 1
        ? desktop ? 'Öffne die Demo zusätzlich im Browser.' : 'Öffne eine weitere Ansicht, um beide Zeiger live zu sehen.'
        : 'Andere Teilnehmer sehen deine Bewegung in ihrer Ansicht.';

    return (
        <>
            <header>
                <div class="layout shell-header">
                    <div class="brand">
                        <mosaik-image src={cursorMark} alt="" fit="contain" width="32px" height="32px" />
                        <span>Cursor</span>
                    </div>
                    <div class="shell-tools">
                        <mosaik-badge
                            data-testid="connection-status"
                            data-connected={connection.count}
                            appearance="soft"
                            variant={connection.count ? 'success' : 'neutral'}
                            aria-live="polite"
                            label={connection.label}
                        />
                        {!desktop && (
                            <mosaik-button
                                data-testid="another-view"
                                label="Weitere Ansicht öffnen"
                                appearance="outline"
                                icon="add"
                                onClick={() => window.open(location.origin, '_blank', 'noopener')}
                            />
                        )}
                    </div>
                </div>
                <mosaik-divider />
            </header>

            <main class="layout workspace">
                <section class="page-heading" aria-labelledby="workspace-title">
                    <h1 id="workspace-title">Gemeinsame Ansicht</h1>
                    <p>Bewege deinen Zeiger live in mehreren Ansichten. Der Assistent kann dir Bedienelemente zeigen und sie für dich öffnen.</p>
                </section>

                {desktop && <DesktopConnectionView bridge={desktop} onState={setModelState} />}

                <div class="workspace-columns">
                    <section
                        ref={surface}
                        id="surface"
                        aria-label="Zeigerfläche"
                        data-testid="surface"
                        data-cursor-style={style}
                    >
                        <mosaik-card appearance="outline">
                            <mosaik-card-header>
                                <div class="workspace-card-heading">
                                    <mosaik-card-title text="Zeigerfläche" />
                                    <mosaik-button
                                        ref={settingsButton}
                                        id="settings"
                                        data-testid="settings"
                                        label="Einstellungen"
                                        appearance="plain"
                                        icon="settings"
                                        aria-controls="settings-panel"
                                        aria-expanded={settingsOpen}
                                        onClick={openSettings}
                                    />
                                </div>
                            </mosaik-card-header>
                            <mosaik-card-content class="workspace-card-content">
                                <mosaik-card
                                    class="pointer-stage"
                                    data-testid="pointer-area"
                                    data-cursor-hide-native
                                    appearance="soft"
                                >
                                    <mosaik-card-content class="pointer-stage-content">
                                        <mosaik-empty-state
                                            class="pointer-hint"
                                            icon="cursor"
                                            iconSize="large"
                                            header="Zeiger bewegen"
                                            content={pointerHint}
                                        />
                                    </mosaik-card-content>
                                </mosaik-card>
                                <mosaik-card
                                    ref={settingsPanel}
                                    id="settings-panel"
                                    data-testid="settings-panel"
                                    data-open-count={openCount || undefined}
                                    appearance="outline"
                                    hidden={!settingsOpen}
                                >
                                    <mosaik-card-header>
                                        <mosaik-card-title text="Zeigerstil" />
                                    </mosaik-card-header>
                                    <mosaik-card-content>
                                        <mosaik-select
                                            ref={styleSelect}
                                            id="cursor-style"
                                            data-testid="cursor-style"
                                            label="Darstellung"
                                            intl={styleIntl}
                                            value={style}
                                            onchanged={selectCursorStyle}
                                        >
                                            {cursorStyleSchema.options.map((value) => (
                                                <mosaik-select-item
                                                    key={value}
                                                    data-testid={`cursor-style-${value}`}
                                                    value={value}
                                                    label={cursorStyleLabels[value]}
                                                />
                                            ))}
                                        </mosaik-select>
                                    </mosaik-card-content>
                                    <mosaik-card-actions>
                                        <mosaik-button
                                            id="close-settings"
                                            label="Schließen"
                                            appearance="plain"
                                            onClick={() => setSettingsOpen(false)}
                                        />
                                    </mosaik-card-actions>
                                </mosaik-card>
                            </mosaik-card-content>
                        </mosaik-card>
                    </section>
                    <AssistantChat
                        connected={cursorReady && modelReady}
                        conversationKey={conversationKey}
                        desktop={desktop}
                        run={run}
                    />
                </div>
            </main>
        </>
    );
}
