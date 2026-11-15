import type { CursorAccessorRegistry } from '@pixel-brewery/cursor-browser';

export class FixtureButtonAccessor {
    static readonly tagName = 'button';

    constructor(readonly element: HTMLElement) {}

    async activate(): Promise<void> {
        this.element.click();
    }
}

export function markFixtureButtonAccessor(
    registry: CursorAccessorRegistry,
    button: HTMLButtonElement,
): void {
    if (registry.get('button') !== FixtureButtonAccessor) return;

    const accessor = registry.bind(button, FixtureButtonAccessor);
    if (accessor instanceof FixtureButtonAccessor && accessor.element === button) {
        button.setAttribute('data-cursor-accessor', FixtureButtonAccessor.tagName);
    }
}
