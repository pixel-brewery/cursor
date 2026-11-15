// #region Imports

import { mkdir, mkdtemp, readFile, readdir, rename, rm, unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { renderMosaikAccessors } from './renderMosaikAccessors.js';

// #endregion

const foundationPackage = '@pixel-brewery/mosaik-elements-foundation';

/**
 * Resolves the installed Foundation package and generates its guided accessors.
 *
 * @param projectRoot - Absolute path of the consuming Nx project.
 * @param mode - Whether to write the generated modules or verify the output directory.
 * @returns Number of component accessors generated or verified.
 */
export async function generateMosaikAccessors(
    projectRoot: string,
    mode: 'write' | 'check',
): Promise<number> {
    const require = createRequire(resolve(projectRoot, 'package.json'));
    const packagePath = require.resolve(`${foundationPackage}/package.json`);
    const packageManifest: unknown = JSON.parse(await readFile(packagePath, 'utf8'));
    const manifestEntry = packageManifest && typeof packageManifest === 'object' &&
        'customElements' in packageManifest ? packageManifest.customElements : undefined;
    if (typeof manifestEntry !== 'string' || !manifestEntry) {
        throw new Error(`${foundationPackage} does not declare a Custom Elements Manifest.`);
    }

    const manifest: unknown = JSON.parse(await readFile(resolve(dirname(packagePath), manifestEntry), 'utf8'));
    const expected = renderMosaikAccessors(manifest);
    const output = join(projectRoot, 'src', 'generated');
    const entries = await readdir(output).catch((error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') return [];
        throw error;
    });
    const stale = entries.filter((name) => /^[a-z][a-z0-9-]*\.ts$/.test(name) && !expected.has(name));
    const present = new Set(entries);
    const updates = new Map<string, string>();
    for (const [name, source] of expected) {
        if (!present.has(name) || (await readFile(join(output, name), 'utf8')) !== source) {
            updates.set(name, source);
        }
    }

    if (!updates.size && !stale.length) return expected.size;
    if (mode === 'check') {
        throw new Error(`Mosaik accessors are missing or stale: ${[...updates.keys(), ...stale].join(', ')}.`);
    }
    await mkdir(output, { recursive: true });
    const stagingDirectory = await mkdtemp(join(output, '.mosaik-accessors-'));
    try {
        for (const [name, source] of updates) {
            const stagedOutput = join(stagingDirectory, name);
            await writeFile(stagedOutput, source, 'utf8');
            await rename(stagedOutput, join(output, name));
        }
        for (const name of stale) await unlink(join(output, name));
    } finally {
        await rm(stagingDirectory, { recursive: true, force: true });
    }
    return expected.size;
}
