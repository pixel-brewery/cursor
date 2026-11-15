// #region Imports

import { fileURLToPath } from 'node:url';
import { app, BrowserWindow } from 'electron';
import { readReferencePort } from './configuration/readReferencePort.js';
import { registerDesktopConnection } from './electron/registerDesktopConnection.js';
import type { IReferenceServer } from './interfaces/IReferenceServer.js';
import { LocalAssistant } from './services/LocalAssistant.js';
import { startReferenceServer } from './services/startReferenceServer.js';

// #endregion

const port = readReferencePort(process.env.CURSOR_REFERENCE_PORT);
const origin = `http://127.0.0.1:${port}`;
const url = new URL('/?host=electron', origin);
let ownedServer: IReferenceServer | undefined;
let window: BrowserWindow | undefined;
let assistant: LocalAssistant | undefined;
let detachDesktopConnection: (() => void) | undefined;
let cleanup: Promise<void> | undefined;
let mayQuit = false;

async function canReuseServer(): Promise<boolean> {
    try {
        const response = await fetch(new URL('/_cursor-reference', origin), {
            redirect: 'error',
            signal: AbortSignal.timeout(1000),
        });
        return response.ok && (await response.text()) === 'cursor-reference';
    } catch {
        return false;
    }
}

function close(): Promise<void> {
    cleanup ??= (async () => {
        detachDesktopConnection?.();
        try {
            await assistant?.dispose();
        } finally {
            await ownedServer?.close();
        }
    })();
    return cleanup;
}

void app
    .whenReady()
    .then(async () => {
        if (!(await canReuseServer())) ownedServer = await startReferenceServer(port);
        if (cleanup) {
            await ownedServer?.close();
            return;
        }

        assistant = new LocalAssistant(app.getPath('userData'));
        window = new BrowserWindow({
            width: 800,
            height: 760,
            minWidth: 390,
            minHeight: 560,
            title: 'Cursor reference demo',
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false,
                sandbox: true,
                preload: fileURLToPath(new URL('./electron/preload.cjs', import.meta.url)),
            },
        });
        detachDesktopConnection = registerDesktopConnection(window.webContents, url, assistant);
        window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
        window.webContents.on('will-navigate', (event) => {
            if (event.url !== url.href) event.preventDefault();
        });
        window.webContents.on('will-redirect', (event) => {
            if (event.url !== url.href) event.preventDefault();
        });
        window.webContents.session.setPermissionRequestHandler((_contents, _permission, respond) =>
            respond(false),
        );
        await window.loadURL(url.href);
    })
    .catch(async (error: unknown) => {
        console.error('The Cursor reference window could not start.', error);
        try {
            await close();
        } finally {
            app.exit(1);
        }
    });

app.on('window-all-closed', () => app.quit());
app.on('before-quit', (event) => {
    if (mayQuit) return;
    event.preventDefault();
    if (cleanup) return;
    void close().then(
        () => {
            mayQuit = true;
            app.quit();
        },
        () => {
            console.error('The Cursor reference app could not close cleanly.');
            app.exit(1);
        },
    );
});
