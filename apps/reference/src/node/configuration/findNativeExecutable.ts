// #region Imports

import { constants } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { delimiter, isAbsolute, join } from 'node:path';
import type { LocalConnection } from '../../contracts/DesktopConnection.js';

// #endregion

/**
 * Finds only the executable for the selected driver, using the desktop process
 * environment and known installation locations when macOS launches without shell PATH.
 */
export async function findNativeExecutable(
    provider: LocalConnection['provider'],
): Promise<string | undefined> {
    const windows = process.platform === 'win32';
    const path = Object.entries(process.env).find(([key]) => key.toUpperCase() === 'PATH')?.[1];
    const defaults = windows
        ? []
        : [
              '/opt/homebrew/bin',
              '/usr/local/bin',
              '/usr/bin',
              '/bin',
              join(homedir(), '.local', 'bin'),
              join(homedir(), '.bun', 'bin'),
              ...(provider === 'opencode' ? [join(homedir(), '.opencode', 'bin')] : []),
          ];
    const pathDirectories = (path ?? '').split(delimiter).filter(isAbsolute).slice(0, 256);
    const directories = [...new Set([...pathDirectories, ...defaults])];
    const names = windows
        ? ['.EXE', '.CMD', '.BAT', '.COM'].map((extension) => provider + extension)
        : [provider];
    const candidates = directories.flatMap((directory) =>
        names.map((name) => join(directory, name)),
    );
    if (provider === 'codex' && process.platform === 'darwin') {
        const bundled =
            'ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex';
        candidates.push(join('/Applications', bundled), join(homedir(), 'Applications', bundled));
    }

    for (const candidate of candidates) {
        try {
            if (!(await stat(candidate)).isFile()) continue;
            await access(candidate, windows ? constants.F_OK : constants.X_OK);
            return candidate;
        } catch {
            // Continue only through the fixed names and host-controlled search locations.
        }
    }
    return undefined;
}
