type JsonObject = Record<string, unknown>;

interface IRequiredMember {
    readonly name: string;
    readonly kind: 'field' | 'method';
    readonly manifestType: string;
    readonly bindingType?: string;
}

const selectTag = 'mosaik-select';
const itemTag = 'mosaik-select-item';

const selectMembers: readonly IRequiredMember[] = [
    { name: 'disabled', kind: 'field', manifestType: 'boolean' },
    { name: 'isDropDownOpen', kind: 'field', manifestType: 'boolean' },
    { name: 'items', kind: 'field', manifestType: 'Array<TItem>', bindingType: 'readonly IMosaikSelectItemElement[]' },
    { name: 'selectedItem', kind: 'field', manifestType: 'TItem | null', bindingType: 'IMosaikSelectItemElement | null' },
    { name: 'value', kind: 'field', manifestType: 'string | null' },
    { name: 'open', kind: 'method', manifestType: 'void' },
    { name: 'close', kind: 'method', manifestType: 'void' },
];

const itemMembers: readonly IRequiredMember[] = [
    { name: 'disabled', kind: 'field', manifestType: 'boolean' },
    { name: 'value', kind: 'field', manifestType: 'TType', bindingType: 'unknown' },
];

function object(value: unknown): JsonObject | undefined {
    return value !== null && typeof value === 'object' ? value as JsonObject : undefined;
}

function objects(value: unknown): JsonObject[] {
    const entries: readonly unknown[] = Array.isArray(value) ? value : [];
    return entries.map(object).filter((entry) => entry !== undefined);
}

function requireElement(declarations: readonly JsonObject[], tag: string): JsonObject {
    const matches = declarations.filter((entry) => entry.customElement === true && entry.tagName === tag);
    if (matches.length === 1 && matches[0]) return matches[0];
    throw new Error(`The Mosaik manifest must declare exactly one ${tag} custom element.`);
}

function formatMembers(declaration: JsonObject, required: readonly IRequiredMember[]): string {
    const members = objects(declaration.members);
    return required.map(({ name, kind, manifestType, bindingType }) => {
        const member = members.find((entry) => entry.name === name && entry.kind === kind &&
            entry.privacy === 'public' && entry.static !== true);
        const type = object(kind === 'method' ? object(member?.return)?.type : member?.type)?.text;
        if (type !== manifestType || (kind === 'method' && objects(member?.parameters).length > 0)) {
            throw new Error(`Incompatible Mosaik API for ${String(declaration.tagName)}.${name}. Expected a public ${kind} of type ${manifestType}.`);
        }

        return kind === 'method'
            ? `    ${name}(): ${manifestType};`
            : `    readonly ${name}: ${bindingType ?? manifestType};`;
    }).join('\n');
}

/**
 * Projects the public capabilities used by the select interaction into browser-friendly TypeScript.
 *
 * @param manifest - The parsed Mosaik Custom Elements Manifest.
 * @returns The deterministic binding source.
 * @throws When a required Mosaik component or member has changed.
 */
export function renderMosaikSelectBinding(manifest: unknown): string {
    const document = object(manifest);
    if (document?.schemaVersion !== '1.0.0' || !Array.isArray(document.modules)) {
        throw new Error('Expected a Custom Elements Manifest with schema version 1.0.0.');
    }

    const declarations = objects(document.modules).flatMap((module) => objects(module.declarations));
    const select = requireElement(declarations, selectTag);
    const item = requireElement(declarations, itemTag);
    return `// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.

export const mosaikSelectTag = '${selectTag}';
export const mosaikSelectItemTag = '${itemTag}';

export interface IMosaikSelectItemElement extends HTMLElement {
${formatMembers(item, itemMembers)}
}

export interface IMosaikSelectElement extends HTMLElement {
${formatMembers(select, selectMembers)}
}
`;
}
