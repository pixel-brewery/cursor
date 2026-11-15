// #region Imports

import { logger, type ExecutorContext } from '@nx/devkit';
import { resolve } from 'node:path';
import { generateMosaikAccessors } from './generateMosaikAccessors.js';

// #endregion

interface IMosaikBindingsOptions {
    readonly mode: 'write' | 'check';
}

/**
 * Generates the component accessors using the manifest installed for the current project.
 *
 * @param options - The generation mode.
 * @param context - The resolved Nx workspace and target project.
 * @returns The Nx task result.
 */
export default async function execute(
    options: IMosaikBindingsOptions,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    try {
        const project = context.projectName && context.projectsConfigurations?.projects[context.projectName];
        if (!project) throw new Error('The Mosaik bindings executor requires an Nx project.');

        const count = await generateMosaikAccessors(resolve(context.root, project.root), options.mode);
        logger.info(`${options.mode === 'check' ? 'Verified' : 'Generated'} ${count} Mosaik component accessors.`);
        return { success: true };
    } catch (error) {
        logger.error(error instanceof Error ? error.message : String(error));
        return { success: false };
    }
}
