// #region Imports

import { logger, type ExecutorContext } from '@nx/devkit';
import { resolve } from 'node:path';
import type { IMosaikAccessorTransformOptions } from './executor.options.js';
import { transformMosaikAccessors } from './executor.task.js';

// #endregion

/**
 * Generates the component accessors using the manifest installed for the current project.
 *
 * @param options - The source package and generation mode.
 * @param context - The resolved Nx workspace and target project.
 * @returns The Nx task result.
 */
export default async function execute(
    options: IMosaikAccessorTransformOptions,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    try {
        const project = context.projectName && context.projectsConfigurations?.projects[context.projectName];
        if (!project) throw new Error('The Mosaik accessor transform requires an Nx project.');

        const count = await transformMosaikAccessors(resolve(context.root, project.root), options);
        logger.info(`${options.mode === 'check' ? 'Verified' : 'Generated'} ${count} Mosaik component accessors.`);
        return { success: true };
    } catch (error) {
        logger.error(error instanceof Error ? error.message : String(error));
        return { success: false };
    }
}
