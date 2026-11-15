// #region Imports

import { app, BrowserWindow } from 'electron';
import { readReferencePort } from './configuration/readReferencePort.js';
import type { IReferenceServer } from './interfaces/IReferenceServer.js';
import { startReferenceServer } from './services/startReferenceServer.js';

// #endregion

const port = readReferencePort(process.env.CURSOR_REFERENCE_PORT);
const origin = `http://127.0.0.1:${port}`;
const url = new URL('/?host=electron', origin);
let ownedServer: IReferenceServer | undefined;
let window: BrowserWindow | undefined;

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

void app
    .whenReady()
    .then(async () => {
        if (!(await canReuseServer())) ownedServer = await startReferenceServer(port);

        window = new BrowserWindow({
            width: 800,
            height: 760,
            minWidth: 390,
            minHeight: 560,
            title: 'Cursor reference demo',
            webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
        });
        window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
        window.webContents.on('will-navigate', (event, destination) => {
            if (destination !== url.href) event.preventDefault();
        });
        window.webContents.session.setPermissionRequestHandler((_contents, _permission, respond) =>
            respond(false),
        );
        await window.loadURL(url.href);
    })
    .catch(async (error: unknown) => {
        console.error('The Cursor reference window could not start.', error);
        try {
            await ownedServer?.close();
        } finally {
            app.exit(1);
        }
    });

app.on('window-all-closed', () => {
    if (!ownedServer) {
        app.quit();
        return;
    }
    void ownedServer.close().then(
        () => app.quit(),
        (error: unknown) => {
            console.error('The Cursor reference server could not close.', error);
            app.exit(1);
        },
    );
});
