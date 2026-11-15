// #region Imports

import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
import type { IAccessorDefinition } from '../interfaces/IAccessorDefinition.js';
import type { IMosaikElementAccess } from '../interfaces/IMosaikElementAccess.js';
import { getAccessorDefinition } from './Accessor.js';

// #endregion

const controlSelector = [
    'button',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    'a[href]',
    'summary',
    '[role="button"]',
    '[role="switch"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="option"]',
    '[role="tab"]',
    '[role="menuitem"]',
].join(',');

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
    if (element.matches(controlSelector) || !element.shadowRoot) return element;
    const candidates = [...element.shadowRoot.querySelectorAll<HTMLElement>(controlSelector)].filter(
        (candidate) => (candidate.checkVisibility?.({ visibilityProperty: true }) ?? true) &&
            !candidate.parentElement?.closest(controlSelector),
    );
    const [candidate, other] = candidates;
    if (other) throw new Error(`Pass an activation target inside <${element.localName}>.`);
    return candidate ?? element;
}

/**
 * Provides guided operations on one mounted custom element.
 *
 * @remarks Decorate each concrete class with `@Accessor` to declare which element and members it accepts.
 * @public
 */
export abstract class ElementAccessor implements IMosaikElementAccess {
    // #region Fields

    /** The element managed by this instance. */
    protected readonly element: HTMLElement;

    private readonly _definition: IAccessorDefinition;

    // #endregion

    // #region Ctor

    /**
     * Creates an accessor for the mounted element.
     *
     * @param element - The native element supplied by the host framework.
     * @throws If the class is undecorated or the element is disconnected or has the wrong tag.
     */
    public constructor(element: HTMLElement) {
        this._definition = getAccessorDefinition(new.target);
        this.element = element;
        this.assertAvailable();
    }

    // #endregion

    // #region Properties

    /** The tag of the mounted element accepted by this accessor class. */
    public static get tagName(): string {
        return getAccessorDefinition(this).tagName;
    }

    // #endregion

    // #region Methods

    /**
     * Binds this accessor class to an element mounted by the host framework.
     *
     * @typeParam TAccessor - The concrete accessor class used by the caller.
     * @param element - The mounted native custom element.
     * @returns An instance of the concrete accessor class.
     * @throws If the class is undecorated or the element is disconnected or has the wrong tag.
     */
    public static bind<TAccessor extends ElementAccessor>(
        this: new (element: HTMLElement) => TAccessor,
        element: HTMLElement,
    ): TAccessor {
        return new this(element);
    }

    /** {@inheritDoc IMosaikElementAccess.read} */
    public read(property: string): unknown {
        this.assertAvailable();
        assertMember(this._definition.properties, property, 'read');
        return Reflect.get(this.element, property);
    }

    /** {@inheritDoc IMosaikElementAccess.write} */
    public write(property: string, value: unknown): void {
        this.assertAvailable();
        assertMember(this._definition.properties, property, 'write');
        if (
            this._definition.readOnlyProperties.includes(property) ||
            !Reflect.has(this.element, property) ||
            !Reflect.set(this.element, property, value)
        ) {
            throw new Error(`Cannot set '${property}' on <${this._definition.tagName}>.`);
        }
    }

    /** {@inheritDoc IMosaikElementAccess.invoke} */
    public invoke(method: string, ...args: unknown[]): unknown {
        this.assertAvailable();
        assertMember(this._definition.methods, method, 'invoke');
        const action: unknown = Reflect.get(this.element, method);
        if (typeof action !== 'function') throw new Error(`Method '${method}' is unavailable.`);
        return Reflect.apply(action, this.element, args);
    }

    /** {@inheritDoc IMosaikElementAccess.observe} */
    public observe(event: string, listener: EventListener): () => void {
        this.assertAvailable();
        assertMember(this._definition.events, event, 'observe');
        this.element.addEventListener(event, listener);
        return () => this.element.removeEventListener(event, listener);
    }

    /** {@inheritDoc IMosaikElementAccess.activate} */
    public async activate(surface: ICursorSurface, signal: AbortSignal, target?: HTMLElement): Promise<void> {
        signal.throwIfAborted();
        this.assertAvailable();
        const element = this.element;
        const part = target ?? findActivationTarget(element);
        const available = () => belongsTo(part, element) && isEnabled(element) && isEnabled(part);
        if (!available() || !(await surface.guideTo(part, signal))) {
            signal.throwIfAborted();
            throw new Error('The Mosaik activation target is unavailable.');
        }
        signal.throwIfAborted();
        this.assertAvailable();
        if (!available()) throw new Error('The Mosaik activation target changed.');
        part.click();
    }

    private assertAvailable(): void {
        if (!this.element.isConnected || this.element.localName !== this._definition.tagName) {
            throw new Error(`A mounted <${this._definition.tagName}> is required.`);
        }
    }

    // #endregion
}
