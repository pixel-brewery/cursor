// #region Imports

import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { renderMosaikSelectBinding } from './renderMosaikSelectBinding.js';

// #endregion

const foundationPackage = '@pixel-brewery/mosaik-elements-foundation';

/**
 * Resolves the installed Foundation package and generates its select binding.
 *
 * @param projectRoot - Absolute path of the consuming Nx project.
 * @param output - Relative path of the generated TypeScript file within the project.
 * @param mode - Whether to write the generated source or compare it with the checkout.
 */
export async function generateMosaikBindings(
    projectRoot: string,
    output: string,
    mode: 'write' | 'check',
): Promise<void> {
    const outputPath = resolve(projectRoot, output);
    const relativeOutput = relative(projectRoot, outputPath);
    if (isAbsolute(output) || isAbsolute(relativeOutput) || relativeOutput === '..' ||
        relativeOutput.startsWith(`..${sep}`) || !relativeOutput.endsWith('.generated.ts')) {
        throw new Error('Mosaik bindings output must be a .generated.ts file inside the project.');
    }

    const require = createRequire(resolve(projectRoot, 'package.json'));
    const packagePath = require.resolve(`${foundationPackage}/package.json`);
    const packageManifest: unknown = JSON.parse(await readFile(packagePath, 'utf8'));
    const manifestEntry = packageManifest && typeof packageManifest === 'object' &&
        'customElements' in packageManifest ? packageManifest.customElements : undefined;
    if (typeof manifestEntry !== 'string' || !manifestEntry) {
        throw new Error(`${foundationPackage} does not declare a Custom Elements Manifest.`);
    }

    const manifest: unknown = JSON.parse(await readFile(resolve(dirname(packagePath), manifestEntry), 'utf8'));
    const source = renderMosaikSelectBinding(manifest);
    let existing: string | undefined;
    try {
        existing = await readFile(outputPath, 'utf8');
    } catch (error) {
        if (!error || typeof error !== 'object' || !('code' in error) || error.code !== 'ENOENT') {
            throw error;
        }
    }

    if (source === existing) return;
    if (mode === 'check') throw new Error(`Mosaik select binding is missing or stale: ${output}.`);

    const outputDirectory = dirname(outputPath);
    await mkdir(outputDirectory, { recursive: true });
    const stagingDirectory = await mkdtemp(join(outputDirectory, '.mosaik-bindings-'));
    try {
        const stagedOutput = join(stagingDirectory, 'binding.tmp');
        await writeFile(stagedOutput, source, 'utf8');
        await rename(stagedOutput, outputPath);
    } finally {
        await rm(stagingDirectory, { recursive: true, force: true });
    }
}
