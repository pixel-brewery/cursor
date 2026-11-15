import 'reflect-metadata';
import { ThemeService } from '@pixel-brewery/mosaik-elements-foundation';
import { SohoTheme } from '@pixel-brewery/mosaik-themes';
import { createCursorController } from '@pixel-brewery/cursor-core';
import type { CursorCommand, CursorResult } from '@pixel-brewery/cursor-core';
import { attachCursorSurface } from '@pixel-brewery/cursor-browser';
import { connectReference } from './transport.js';
import './styles.css';

ThemeService.instance.applyTheme(SohoTheme.SOHO_THEME);

function getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Missing reference element ${selector}`);
    return element;
}

const host = new URLSearchParams(location.search).get('host') === 'electron' ? 'electron' : 'browser';
const surface = getElement('#surface');
const settings = getElement('#settings');
const panel = getElement('#settings-panel');
const show = getElement('#show');
const open = getElement('#open');
const assistantStatus = getElement('#assistant-status');
const connection = getElement('#connection');
const anotherView = getElement('[data-testid="another-view"]');
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
let opens = 0;
let label = '';
let controller: ReturnType<typeof createCursorController> | undefined;
let releaseSurface: (() => void) | undefined;
let running = false;

function openSettings(): void {
    opens += 1;
    panel.dataset.openCount = String(opens);
    panel.hidden = false;
    settings.setAttribute('aria-expanded', 'true');
}

function updateActions(): void {
    for (const button of [show, open]) button.toggleAttribute('disabled', !controller || running);
}

async function run(command: CursorCommand): Promise<void> {
    if (!controller || running) return;
    const active = controller;
    running = true;
    updateActions();
    assistantStatus.setAttribute('header', 'Moving to Settings…');
    try {
        const result = await active.run(command);
        if (controller === active) assistantStatus.setAttribute('header', messages[result.status]);
    } finally {
        running = false;
        updateActions();
    }
}

settings.addEventListener('click', openSettings);
getElement('#close-settings').addEventListener('click', () => {
    panel.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
});
show.addEventListener('click', () => void run({ kind: 'show', targetId }));
open.addEventListener('click', () => void run({ kind: 'invoke', targetId, actionId }));
anotherView.hidden = host === 'electron';
anotherView.addEventListener('click', () => window.open(location.origin, '_blank', 'noopener'));

const stop = connectReference({
    onConnect(participant, transport) {
        label = participant.label;
        const active = createCursorController({
            viewId: 'reference',
            participant,
            generation: 1,
            transport,
            authorize: (command) => command.actionId === actionId && command.targetId === targetId,
        });
        const attached = attachCursorSurface({ surface, controller: active, showLocalPointer: true });
        const unregisterTarget = attached.registerTarget(targetId, settings);
        const unregisterAction = active.registerAction({ id: actionId, targetId, handler: openSettings });
        controller = active;
        releaseSurface = () => {
            unregisterAction();
            unregisterTarget();
            attached.dispose();
            active.dispose();
        };
        updateActions();
    },
    onCount(count) {
        connection.setAttribute('header', `${label} connected · ${count} ${count === 1 ? 'participant' : 'participants'}`);
        connection.setAttribute('data-connected', String(count));
    },
    onDisconnect() {
        releaseSurface?.();
        releaseSurface = undefined;
        controller = undefined;
        updateActions();
        connection.setAttribute('header', 'Disconnected. Reconnecting…');
        connection.removeAttribute('data-connected');
        assistantStatus.setAttribute('header', 'Choose an assistant action.');
    },
}, host);

window.addEventListener('pagehide', () => {
    releaseSurface?.();
    stop();
}, { once: true });
