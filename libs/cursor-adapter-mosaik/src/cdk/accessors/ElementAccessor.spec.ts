// #region Imports

import { expect, test, vi } from 'vitest';
import type { IAccessorDefinition } from '../interfaces/IAccessorDefinition.js';
import { Accessor } from './Accessor.js';
import { ElementAccessor } from './ElementAccessor.js';

// #endregion

class KnobAccessor extends ElementAccessor {
    public advance(increment: number): number {
        return Number(this.invoke('advance', increment));
    }
}

// The Vite test runner leaves decorator syntax intact. Apply the class initializer explicitly.
function decorate(accessorClass: typeof ElementAccessor, definition: IAccessorDefinition): void {
    Accessor(definition)(accessorClass, {
        kind: 'class',
        name: accessorClass.name,
        metadata: {},
        addInitializer(initializer) {
            initializer.call(accessorClass);
        },
    });
}

decorate(KnobAccessor, {
    tagName: 'mosaik-example-knob',
    properties: ['value', 'count'],
    readOnlyProperties: ['count'],
    methods: ['advance'],
    events: ['changed'],
});

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
    const instance = KnobAccessor.bind(knob as unknown as HTMLElement);
    const listener = vi.fn();
    const release = instance.observe('changed', listener);
    expect(() => instance.write('count', 5)).toThrow();
    expect(() => instance.write('invented', 5)).toThrow();
    expect(() => instance.invoke('dispatchEvent', new Event('changed'))).toThrow();

    instance.write('value', 4);
    expect(instance.advance(2)).toBe(6);
    expect(instance.read('value')).toBe(6);
    expect(listener).toHaveBeenCalledTimes(1);
    release();
    knob.dispatchEvent(new Event('changed'));
    expect(listener).toHaveBeenCalledTimes(1);

    knob.isConnected = false;
    expect(() => instance.read('value')).toThrow();
});

test('each decorated accessor class uses its own definition for the same custom element tag', () => {
    class KnobCountAccessor extends ElementAccessor {}

    decorate(KnobCountAccessor, {
        tagName: 'mosaik-example-knob',
        properties: ['count'],
        readOnlyProperties: ['count'],
        methods: [],
        events: [],
    });

    const element = new MountedKnob() as unknown as HTMLElement;
    const count = new KnobCountAccessor(element);
    const knob = KnobAccessor.bind(element);

    expect(KnobCountAccessor.tagName).toBe('mosaik-example-knob');
    expect(count.read('count')).toBe(3);
    expect(() => count.read('value')).toThrow();
    expect(knob.read('value')).toBe(1);
});
