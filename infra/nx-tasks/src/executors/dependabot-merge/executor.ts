/** Runs the same trusted reconciliation implementation used by the isolated workflow bootstrap. */
export default async function execute(): Promise<{ success: boolean }> {
    const { createDependabotAutomation } = await import('./createDependabotAutomation.mjs');
    await createDependabotAutomation().runFromEnvironment();
    return { success: true };
}
