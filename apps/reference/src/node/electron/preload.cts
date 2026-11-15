// #region Imports

import type { DesktopConnectionBridge } from '../../contracts/DesktopConnection.js' with {
    'resolution-mode': 'import',
};

// #endregion

const { contextBridge, ipcRenderer } = require('electron') as typeof import('electron');
const channel = 'cursor:desktop';

function invoke<Method extends keyof DesktopConnectionBridge>(
    method: Method,
    ...args: Parameters<DesktopConnectionBridge[Method]>
): ReturnType<DesktopConnectionBridge[Method]> {
    return ipcRenderer.invoke(channel, method, ...args) as ReturnType<
        DesktopConnectionBridge[Method]
    >;
}

const bridge: DesktopConnectionBridge = {
    getState: () => invoke('getState'),
    save: (connection) => invoke('save', connection),
    check: () => invoke('check'),
    startLogin: (methodId) => invoke('startLogin', methodId),
    respondLogin: (response) => invoke('respondLogin', response),
    cancelLogin: () => invoke('cancelLogin'),
    openLogin: () => invoke('openLogin'),
    chat: (request) => invoke('chat', request),
    cancelChat: (requestId) => invoke('cancelChat', requestId),
};

if (process.isMainFrame) contextBridge.exposeInMainWorld('cursorDesktop', Object.freeze(bridge));
