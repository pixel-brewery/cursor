// #region Imports

import { mkdir, mkdtemp, readFile, readdir, rename, rm, unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import type { IMosaikAccessorTransformOptions } from './executor.options.js';
import { accessorHeader, renderMosaikAccessors } from './renderMosaikAccessors.js';

// #endregion

function missingFile(error: unknown): boolean {
    return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

async function readEntry(path: string): Promise<string | undefined> {
    try {
        return await readFile(path, 'utf8');
    } catch (error) {
        if (!missingFile(error)) throw error;
        return undefined;
    }
}

/**
 * Resolves the installed element package and reconciles its component entry points.
 *
 * @param projectRoot - Absolute path of the consuming Nx project.
 * @param options - The element package and whether to write or verify the entry points.
 * @returns Number of component accessors generated or verified.
 */
export async function transformMosaikAccessors(
    projectRoot: string,
    { elementModule, mode }: IMosaikAccessorTransformOptions,
): Promise<number> {
    const require = createRequire(resolve(projectRoot, 'package.json'));
    const packagePath = require.resolve(`${elementModule}/package.json`);
    const packageManifest: unknown = JSON.parse(await readFile(packagePath, 'utf8'));
    const manifestEntry = packageManifest && typeof packageManifest === 'object' &&
        'customElements' in packageManifest ? packageManifest.customElements : undefined;
    if (typeof manifestEntry !== 'string' || !manifestEntry) {
        throw new Error(`${elementModule} does not declare a Custom Elements Manifest.`);
    }

    const manifest: unknown = JSON.parse(await readFile(resolve(dirname(packagePath), manifestEntry), 'utf8'));
    const accessors = renderMosaikAccessors(manifest);
    const expected = new Map<string, string>();
    for (const [component, files] of accessors) {
        for (const [file, source] of files) expected.set(`${component}/${file}`, source);
    }
    const output = join(projectRoot, 'src', 'components');
    const entries = await readdir(output, { withFileTypes: true }).catch((error: unknown) => {
        if (!missingFile(error)) throw error;
        return [];
    });
    const existing = new Map<string, string>();
    for (const entry of entries) {
        if (!entry.isDirectory()) {
            if (accessors.has(entry.name)) throw new Error(`Component path is not a directory: ${entry.name}.`);
            continue;
        }
        if (!/^[a-z][a-z0-9-]*$/.test(entry.name)) continue;
        const files = await readdir(join(output, entry.name), { withFileTypes: true });
        for (const file of files) {
            if (!/^(?:index|[A-Z][A-Za-z0-9]*Accessor)\.ts$/.test(file.name)) continue;
            const relativePath = `${entry.name}/${file.name}`;
            const source = file.isFile() ? await readEntry(join(output, relativePath)) : undefined;
            if (source?.startsWith(`${accessorHeader}\n`)) existing.set(relativePath, source);
            else if (expected.has(relativePath)) {
                throw new Error(`Cannot overwrite the unowned file ${relativePath}.`);
            }
        }
    }
    const stale = [...existing.keys()].filter((name) => !expected.has(name));
    const updates = new Map<string, string>();
    for (const [name, source] of expected) {
        if (existing.get(name) !== source) updates.set(name, source);
    }

    if (!updates.size && !stale.length) return accessors.size;
    if (mode === 'check') {
        const paths = [...updates.keys(), ...stale].map((name) => `components/${name}`);
        throw new Error(`Mosaik accessors are missing or stale: ${paths.join(', ')}.`);
    }
    await mkdir(output, { recursive: true });
    const stagingDirectory = await mkdtemp(join(output, '.mosaik-accessors-'));
    try {
        for (const [name, source] of updates) {
            const destination = join(output, name);
            const stagedOutput = join(stagingDirectory, name);
            await mkdir(dirname(stagedOutput), { recursive: true });
            await mkdir(dirname(destination), { recursive: true });
            await writeFile(stagedOutput, source, 'utf8');
            await rename(stagedOutput, destination);
        }
        for (const name of stale) await unlink(join(output, name));
    } finally {
        await rm(stagingDirectory, { recursive: true, force: true });
    }
    return accessors.size;
}
