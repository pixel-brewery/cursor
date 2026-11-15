type JsonObject = Record<string, unknown>;

// A selector with a string value and the dropdown and item APIs can use the
// single-choice interaction. Multi-value and data-only selectors have a different contract.
const choiceFields = {
    disabled: 'boolean',
    isDropDownOpen: 'boolean',
    items: 'Array<TItem>',
    selectedItem: 'TItem | null',
    value: 'string | null',
} as const;

function object(value: unknown): JsonObject | undefined {
    return value !== null && typeof value === 'object' ? value as JsonObject : undefined;
}

function objects(value: unknown): JsonObject[] {
    const entries: readonly unknown[] = Array.isArray(value) ? value : [];
    return entries.map(object).filter((entry) => entry !== undefined);
}

function hasSingleChoiceContract(members: readonly JsonObject[], events: readonly string[]): boolean {
    const hasField = ([name, type]: [string, string]): boolean =>
        members.some((entry) => entry.kind === 'field' && entry.name === name &&
            object(entry.type)?.text === type);
    const hasNoArgMethod = (name: string): boolean => members.some((entry) =>
        entry.kind === 'method' && entry.name === name &&
        object(object(entry.return)?.type)?.text === 'void' && objects(entry.parameters).length === 0);

    return Object.entries(choiceFields).every(hasField) &&
        hasNoArgMethod('open') && hasNoArgMethod('close') &&
        events.includes('selectionChanged');
}

function names(entries: readonly JsonObject[]): string[] {
    return [...new Set(entries.flatMap(({ name }) => typeof name === 'string' ? [name] : []))].sort();
}

function renderAccessor(declaration: JsonObject, tag: string): string {
    const members = objects(declaration.members).filter((entry) =>
        entry.privacy === 'public' && entry.static !== true);
    const fields = members.filter((entry) => entry.kind === 'field');
    const events = names(objects(declaration.events));
    const api = [
        names(fields),
        names(fields.filter((entry) => entry.readonly === true)),
        names(members.filter((entry) => entry.kind === 'method')),
        events,
    ];
    const singleChoice = hasSingleChoiceContract(members, events);

    return `// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

import { createMosaikAccessor } from '../accessors/createMosaikAccessor.js';
${singleChoice ? "import { bindSingleChoice } from '../accessors/bindSingleChoice.js';\n" : ''}
/** Cursor accessor for the ${tag} Web Component. */
export const accessor = createMosaikAccessor(${JSON.stringify(tag)}, [
${api.map((members) => `    ${JSON.stringify(members)},`).join('\n')}
]${singleChoice ? ', bindSingleChoice' : ''});
`;
}

/**
 * Discovers concrete Web Components and renders one executable accessor module per tag.
 *
 * @param manifest - The parsed Mosaik Custom Elements Manifest.
 * @returns The deterministic TypeScript modules, keyed by generated filename.
 * @throws When the file is not a supported Custom Elements Manifest.
 */
export function renderMosaikAccessors(manifest: unknown): ReadonlyMap<string, string> {
    const document = object(manifest);
    if (document?.schemaVersion !== '1.0.0' || !Array.isArray(document.modules)) {
        throw new Error('Expected a Custom Elements Manifest with schema version 1.0.0.');
    }

    const declarations = objects(document.modules).flatMap((module) => objects(module.declarations));
    const modules = new Map<string, string>();
    for (const declaration of declarations) {
        const tag = declaration.tagName;
        if (declaration.customElement !== true || typeof tag !== 'string') continue;
        if (!/^mosaik-[a-z][a-z0-9-]*$/.test(tag)) throw new Error(`Invalid Mosaik tag: ${tag}.`);
        const filename = `${tag.slice('mosaik-'.length)}.ts`;
        if (modules.has(filename)) throw new Error(`Duplicate Mosaik tag: ${tag}.`);
        modules.set(filename, renderAccessor(declaration, tag));
    }
    if (!modules.size) throw new Error('The manifest contains no Mosaik Web Component tags.');
    return new Map([...modules].sort(([left], [right]) => left.localeCompare(right, 'en')));
}
