// #region Imports

import { logger, type ExecutorContext } from '@nx/devkit';
import { resolve } from 'node:path';
import { generateMosaikBindings } from './generateMosaikBindings.js';

// #endregion

interface IMosaikBindingsOptions {
    readonly output: string;
    readonly mode: 'write' | 'check';
}

/**
 * Generates the adapter binding using the manifest installed for the current project.
 *
 * @param options - The project-relative output location and generation mode.
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

        await generateMosaikBindings(resolve(context.root, project.root), options.output, options.mode);
        return { success: true };
    } catch (error) {
        logger.error(error instanceof Error ? error.message : String(error));
        return { success: false };
    }
}
