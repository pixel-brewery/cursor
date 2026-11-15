import type { ICursorController } from '@pixel-brewery/cursor-core';

export interface IFixture {
    setController(controller: ICursorController): void;
    setTargetId(targetId: string): void;
    destroy(): void | Promise<void>;
}
