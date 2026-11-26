interface IDependabotConfiguration {
    readonly repository: string;
    readonly repositoryId: number;
    readonly workflowFile: string;
    readonly workflowName: string;
    readonly requiredJobs: readonly string[];
    readonly requiredChecks?: readonly string[];
    readonly normalizeMosaikLockRoot?: boolean;
    readonly postMergeWorkflows?: readonly {
        readonly file: string;
        readonly paths?: readonly string[];
        readonly inputKey?: string;
    }[];
}
interface IDependabotDependencies {
    readonly request?: (method: string, endpoint: string, body?: unknown) => Promise<unknown>;
    readonly wait?: () => Promise<void>;
}
/** Creates the single trusted reconciliation implementation without import-time effects. */
export declare function createDependabotAutomation(
    configuration?: IDependabotConfiguration,
    dependencies?: IDependabotDependencies,
): {
    reconcile(number: number): Promise<unknown>;
    runFromEnvironment(): Promise<readonly unknown[]>;
};
