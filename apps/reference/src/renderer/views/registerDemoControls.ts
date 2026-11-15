// #region Imports

import { selectOption } from '@pixel-brewery/cursor-adapter-mosaik';
import { CheckboxAccessor } from '@pixel-brewery/cursor-adapter-mosaik/components/checkbox';
import { DataTableAccessor } from '@pixel-brewery/cursor-adapter-mosaik/components/data-table';
import type { CursorAccessorRegistry, ICursorSurface } from '@pixel-brewery/cursor-browser';
import type { CursorCommand, CursorResult, ICursorController } from '@pixel-brewery/cursor-core';
import { demoCommands, isDemoAction, type DemoAction } from '../../contracts/DemoActions.js';

// #endregion

type DemoCommand = (typeof demoCommands)[DemoAction];

interface IDemoControls {
    readonly tabs: HTMLElementTagNameMap['mosaik-tab'];
    readonly region: HTMLElementTagNameMap['mosaik-select'];
    readonly table: HTMLElementTagNameMap['mosaik-data-table'];
    readonly checkbox: HTMLElementTagNameMap['mosaik-checkbox'];
}

const getTargetId = (target: DemoCommand['target']): string => `demo-${target}`;

/** Checks an invocation against the demo's host-owned action catalog. @internal */
export function authorizeDemoCommand(command: Extract<CursorCommand, { kind: 'invoke' }>): boolean {
    if (command.input !== undefined || !isDemoAction(command.actionId)) return false;
    const action = demoCommands[command.actionId];
    return action.kind !== 'show' && command.targetId === getTargetId(action.target);
}

async function revealTarget(
    tabs: IDemoControls['tabs'],
    target: HTMLElement,
    signal: AbortSignal,
): Promise<boolean> {
    const panel = target.closest('mosaik-tab-item');
    if (signal.aborted || !panel || !tabs.items.includes(panel)) return false;
    if (tabs.selectedItem !== panel) {
        tabs.select(panel);
        await tabs.updateComplete;
        await panel.updateComplete;
    }
    // The selected panel can already have layout while its entrance animation is still transparent.
    const animations = (panel.animationTarget ?? panel).getAnimations();
    await Promise.allSettled(animations.map((animation) => animation.finished));
    return tabs.selectedItem === panel && target.isConnected;
}

/** Registers the mounted demo controls and routes actions through their owning tab. @internal */
export function registerDemoControls(
    controller: ICursorController,
    surface: ICursorSurface,
    registry: CursorAccessorRegistry,
    controls: IDemoControls,
): (action: DemoAction, signal: AbortSignal) => Promise<CursorResult> {
    const checkbox = registry.bind(controls.checkbox, CheckboxAccessor);
    const table = registry.bind(controls.table, DataTableAccessor);

    for (const target of ['region', 'table', 'checkbox'] as const) {
        surface.registerTarget(getTargetId(target), controls[target]);
    }

    async function apply(command: Exclude<DemoCommand, { kind: 'show' }>, signal: AbortSignal): Promise<void> {
        signal.throwIfAborted();
        switch (command.kind) {
            case 'select':
                return selectOption(controls.region, surface, { kind: 'value', value: command.value }, signal);
            case 'sort': {
                table.invoke('sort', command.column, command.direction);
                const [first, ...others] = controls.table.sortExpressions;
                if (others.length || first?.sortKey !== command.column || first.sortDirection !== command.direction) {
                    throw new Error('The demo table did not apply the requested sort.');
                }
                return;
            }
            case 'group': {
                table.invoke('regroup', command.columns);
                const actual = controls.table.groupBy;
                if (actual.length !== command.columns.length || actual.some((key, i) => key !== command.columns[i])) {
                    throw new Error('The demo table did not apply the requested grouping.');
                }
                return;
            }
            case 'set-checked':
                if (controls.checkbox.isChecked !== command.checked) await checkbox.activate(surface, signal);
                if (controls.checkbox.isChecked !== command.checked) {
                    throw new Error('The demo checkbox did not apply the requested state.');
                }
        }
    }

    for (const actionId of Object.keys(demoCommands).filter(isDemoAction)) {
        const command = demoCommands[actionId];
        if (command.kind === 'show') continue;
        controller.registerAction({
            id: actionId,
            targetId: getTargetId(command.target),
            handler: (_input, signal) => apply(command, signal),
        });
    }

    return async (action, signal) => {
        const command = demoCommands[action];
        const targetId = getTargetId(command.target);
        const visible = await revealTarget(controls.tabs, controls[command.target], signal);
        if (signal.aborted) return { status: 'cancelled' };
        if (!visible) return { status: 'unavailable' };
        return controller.run(
            command.kind === 'show'
                ? { kind: 'show', targetId }
                : { kind: 'invoke', targetId, actionId: action },
            signal,
        );
    };
}
