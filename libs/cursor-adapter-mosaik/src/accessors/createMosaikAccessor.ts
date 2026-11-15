import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import type { IMosaikAccessor } from '../interfaces/IMosaikAccessor.js';

type Api = readonly [
    readable: readonly string[],
    readOnly: readonly string[],
    methods: readonly string[],
    events: readonly string[],
];

const control = 'button,input:not([type="hidden"]),select,textarea,a[href],summary,[role="button"],[role="switch"],[role="checkbox"],[role="radio"],[role="option"],[role="tab"],[role="menuitem"]';

function assertAvailable(element: HTMLElement, tag: string): void {
    if (!element.isConnected || element.localName !== tag) {
        throw new Error(`A mounted <${tag}> is required.`);
    }
}

function assertMember(names: readonly string[], name: string, operation: string): void {
    if (!names.includes(name)) throw new Error(`Cannot ${operation} undeclared member '${name}'.`);
}

function belongsTo(target: HTMLElement, element: HTMLElement): boolean {
    const view = element.ownerDocument.defaultView;
    for (let current: Element | null = target; current;) {
        if (current === element) return true;
        const root = current.getRootNode();
        current = current.assignedSlot ?? current.parentElement ??
            (view && root instanceof view.ShadowRoot ? root.host : null);
    }
    return false;
}

function isEnabled(element: HTMLElement): boolean {
    return !element.matches(':disabled,[aria-disabled="true"],[inert]') &&
        !('disabled' in element && element.disabled === true);
}

function findActivationTarget(element: HTMLElement): HTMLElement {
    if (element.matches(control) || !element.shadowRoot) return element;
    const candidates = [...element.shadowRoot.querySelectorAll<HTMLElement>(control)].filter(
        (candidate) => (candidate.checkVisibility?.({ visibilityProperty: true }) ?? true) &&
            !candidate.parentElement?.closest(control),
    );
    const [candidate, other] = candidates;
    if (other) throw new Error(`Pass an activation target inside <${element.localName}>.`);
    return candidate ?? element;
}

/**
 * Supplies the shared runtime to a generated component entry.
 * @internal
 */
export function createMosaikAccessor<TInteraction extends object = object>(
    tagName: string,
    [readable, readOnly, methods, events]: Api,
    extend?: (element: HTMLElement) => TInteraction,
): IMosaikAccessor<TInteraction> {
    return {
        tagName,
        bind(element) {
            const check = () => assertAvailable(element, tagName);
            check();
            return Object.assign({
                read(property: string): unknown {
                    check();
                    assertMember(readable, property, 'read');
                    return Reflect.get(element, property);
                },
                write(property: string, value: unknown): void {
                    check();
                    assertMember(readable, property, 'write');
                    if (readOnly.includes(property) || !Reflect.has(element, property) ||
                        !Reflect.set(element, property, value)) {
                        throw new Error(`Cannot set '${property}' on <${tagName}>.`);
                    }
                },
                invoke(method: string, ...args: unknown[]): unknown {
                    check();
                    assertMember(methods, method, 'invoke');
                    const action: unknown = Reflect.get(element, method);
                    if (typeof action !== 'function') throw new Error(`Method '${method}' is unavailable.`);
                    return Reflect.apply(action, element, args);
                },
                observe(event: string, listener: EventListener): () => void {
                    check();
                    assertMember(events, event, 'observe');
                    element.addEventListener(event, listener);
                    return () => element.removeEventListener(event, listener);
                },
                async activate(surface: ICursorSurface, signal: AbortSignal, target?: HTMLElement) {
                    signal.throwIfAborted();
                    check();
                    const part = target ?? findActivationTarget(element);
                    const available = () => belongsTo(part, element) && isEnabled(element) && isEnabled(part);
                    if (!available() || !(await surface.guideTo(part, signal))) {
                        signal.throwIfAborted();
                        throw new Error('The Mosaik activation target is unavailable.');
                    }
                    signal.throwIfAborted();
                    check();
                    if (!available()) throw new Error('The Mosaik activation target changed.');
                    part.click();
                },
            }, extend?.(element) as TInteraction);
        },
    };
}
