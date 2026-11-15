import { expect, test } from 'vitest';
import { withCursorAccessors } from '../withCursorAccessors.js';
import { CursorAccessorRegistry } from './CursorAccessorRegistry.js';

class ButtonAccessor {
    public static readonly tagName = 'button';

    public constructor(public readonly element: HTMLElement) {}

    public async activate(): Promise<void> {}
}

class AlternativeButtonAccessor extends ButtonAccessor {}

test('binds a tag only in the application that configured its accessor', () => {
    const element = { localName: 'button' } as HTMLButtonElement;
    const registry = new CursorAccessorRegistry(withCursorAccessors(ButtonAccessor));
    const unconfigured = new CursorAccessorRegistry();

    expect(registry.bind(element)).toBeInstanceOf(ButtonAccessor);
    expect(registry.bind(element, ButtonAccessor).element).toBe(element);
    expect(unconfigured.bind(element)).toBeUndefined();
    expect(() => unconfigured.bind(element, ButtonAccessor)).toThrow('not configured');
});

test('rejects conflicting classes for a tag while allowing repeated features', () => {
    const feature = withCursorAccessors(ButtonAccessor);
    expect(new CursorAccessorRegistry(feature, feature).get('button')).toBe(ButtonAccessor);
    expect(() => new CursorAccessorRegistry(feature, withCursorAccessors(AlternativeButtonAccessor)))
        .toThrow('Multiple Cursor accessors');
});
