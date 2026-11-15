type JsonObject = Record<string, unknown>;

export const accessorHeader = '// Generated from the Mosaik Custom Elements Manifest. Edit the Nx executor instead.';

function object(value: unknown): JsonObject | undefined {
    return value !== null && typeof value === 'object' ? value as JsonObject : undefined;
}

function objects(value: unknown): JsonObject[] {
    const entries: readonly unknown[] = Array.isArray(value) ? value : [];
    return entries.map(object).filter((entry) => entry !== undefined);
}

function names(entries: readonly JsonObject[]): string[] {
    return [...new Set(entries.flatMap(({ name }) => typeof name === 'string' ? [name] : []))].sort();
}

function quote(value: string): string {
    return `'${JSON.stringify(value).slice(1, -1).replaceAll("'", "\\'")}'`;
}

function renderMembers(name: string, members: readonly string[]): string {
    const literals = members.map(quote);
    const inline = `    ${name}: [${literals.join(', ')}],`;
    if (inline.length <= 88) return inline;
    return `    ${name}: [\n${literals.map((value) => `        ${value},`).join('\n')}\n    ],`;
}

function accessorName(declaration: JsonObject, tag: string): string {
    const name = declaration.name;
    if (typeof name !== 'string' || !/^[A-Z][A-Za-z0-9]*Element$/.test(name)) {
        throw new Error(`Expected a named element class for ${tag}.`);
    }
    return `${name.slice(0, -'Element'.length)}Accessor`;
}

function renderAccessor(declaration: JsonObject, tag: string, className: string): string {
    const members = objects(declaration.members).filter((entry) =>
        entry.privacy === 'public' && entry.static !== true);
    const fields = members.filter((entry) => entry.kind === 'field');
    const events = names(objects(declaration.events));
    const baseName = className === 'ElementAccessor' ? 'BaseAccessor' : 'ElementAccessor';
    const baseImport = baseName === 'ElementAccessor' ? baseName : `ElementAccessor as ${baseName}`;

    return `${accessorHeader}

// #region Imports

import { Accessor } from '../../cdk/accessors/Accessor.js';
import { ${baseImport} } from '../../cdk/accessors/ElementAccessor.js';

// #endregion

/**
 * Cursor accessor for the \`${tag}\` Web Component.
 *
 * @public
 */
@Accessor({
    tagName: ${quote(tag)},
${renderMembers('properties', names(fields))}
${renderMembers('readOnlyProperties', names(fields.filter((entry) => entry.readonly === true)))}
${renderMembers('methods', names(members.filter((entry) => entry.kind === 'method')))}
${renderMembers('events', events)}
})
export class ${className} extends ${baseName} {}
`;
}

/**
 * Renders a named accessor class and a separate package entry for each concrete Web Component.
 *
 * @param manifest - The parsed Mosaik Custom Elements Manifest.
 * @returns The deterministic source files, grouped by component directory.
 * @throws When the file is not a supported Custom Elements Manifest.
 */
export function renderMosaikAccessors(manifest: unknown): ReadonlyMap<string, ReadonlyMap<string, string>> {
    const document = object(manifest);
    if (document?.schemaVersion !== '1.0.0' || !Array.isArray(document.modules)) {
        throw new Error('Expected a Custom Elements Manifest with schema version 1.0.0.');
    }

    const declarations = objects(document.modules).flatMap((module) => objects(module.declarations));
    const modules = new Map<string, ReadonlyMap<string, string>>();
    for (const declaration of declarations) {
        const tag = declaration.tagName;
        if (declaration.customElement !== true || typeof tag !== 'string') continue;
        if (!/^mosaik-[a-z][a-z0-9-]*$/.test(tag)) throw new Error(`Invalid Mosaik tag: ${tag}.`);
        const component = tag.slice('mosaik-'.length);
        if (modules.has(component)) throw new Error(`Duplicate Mosaik tag: ${tag}.`);
        const className = accessorName(declaration, tag);
        modules.set(component, new Map([
            [`${className}.ts`, renderAccessor(declaration, tag, className)],
            ['index.ts', `${accessorHeader}\n\nexport { ${className} } from './${className}.js';\n`],
        ]));
    }
    if (!modules.size) throw new Error('The manifest contains no Mosaik Web Component tags.');
    return new Map([...modules].sort(([left], [right]) => left.localeCompare(right, 'en')));
}
