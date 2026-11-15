// #region Imports

import { randomUUID } from 'node:crypto';
import { mkdir, open, rename, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { localConnectionSchema, type LocalConnection } from '../../contracts/DesktopConnection.js';

// #endregion

const maxSelectionBytes = 4096;

/** Reads only non-secret app settings. Missing or invalid settings have no active selection. */
export async function readLocalConnection(file: string): Promise<LocalConnection | null> {
    try {
        const handle = await open(file, 'r');
        try {
            const info = await handle.stat();
            if (!info.isFile() || info.size > maxSelectionBytes) return null;
            const buffer = Buffer.alloc(maxSelectionBytes + 1);
            const { bytesRead } = await handle.read(buffer, 0, buffer.length);
            if (bytesRead > maxSelectionBytes) return null;

            const stored = JSON.parse(buffer.toString('utf8', 0, bytesRead)) as unknown;
            const result = localConnectionSchema.safeParse(stored);
            return result.success ? result.data : null;
        } finally {
            await handle.close();
        }
    } catch (error) {
        if (error instanceof SyntaxError) return null;
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return null;
        throw error;
    }
}

/** Atomically replaces the selection with the validated non-secret fields. */
export async function writeLocalConnection(
    file: string,
    connection: LocalConnection,
): Promise<void> {
    const directory = dirname(file);
    await mkdir(directory, { recursive: true, mode: 0o700 });
    const pending = `${file}.${randomUUID()}.tmp`;
    try {
        await writeFile(pending, JSON.stringify(connection), { flag: 'wx', mode: 0o600 });
        await rename(pending, file);
    } finally {
        await rm(pending, { force: true });
    }
}
