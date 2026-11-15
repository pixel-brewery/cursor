import { expect, test, vi } from 'vitest';
import { createMosaikAccessor } from './createMosaikAccessor.js';

class MountedKnob extends EventTarget {
    public readonly localName = 'mosaik-example-knob';
    public isConnected = true;
    public value = 1;
    public readonly count = 3;

    public advance(increment: number): number {
        this.value += increment;
        this.dispatchEvent(new Event('changed'));
        return this.value;
    }
}

test('a bound accessor respects the declared API and keeps the element as method receiver', () => {
    const knob = new MountedKnob();
    const accessor = createMosaikAccessor(knob.localName, [
        ['value', 'count'], ['count'], ['advance'], ['changed'],
    ]);
    const instance = accessor.bind(knob as unknown as HTMLElement);
    const listener = vi.fn();
    const release = instance.observe('changed', listener);
    expect(() => instance.write('count', 5)).toThrow();
    expect(() => instance.write('invented', 5)).toThrow();
    expect(() => instance.invoke('dispatchEvent', new Event('changed'))).toThrow();

    instance.write('value', 4);
    expect(instance.invoke('advance', 2)).toBe(6);
    expect(instance.read('value')).toBe(6);
    expect(listener).toHaveBeenCalledTimes(1);
    release();
    knob.dispatchEvent(new Event('changed'));
    expect(listener).toHaveBeenCalledTimes(1);

    knob.isConnected = false;
    expect(() => instance.read('value')).toThrow();
});
