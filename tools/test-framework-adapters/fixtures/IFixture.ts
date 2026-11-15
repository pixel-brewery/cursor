import type { ICursorController } from '@pixel-brewery/cursor-core';

export interface IFixture {
    setController(controller: ICursorController): void;
    setTargetId(targetId: string): void;
    setSurfaceProjection(allowed: boolean): void;
    destroy(): void | Promise<void>;
}
