// #region Imports

import { describe, expect, it } from 'vitest';
import { renderMosaikAccessors } from './renderMosaikAccessors.js';

// #endregion

function field(name: string, text: string) {
    return { kind: 'field', name, privacy: 'public', type: { text } };
}

function method(name: string) {
    return { kind: 'method', name, privacy: 'public', return: { type: { text: 'void' } } };
}

function createManifest(open = method('open')) {
    const select = {
        name: 'RegionPickerElement',
        tagName: 'mosaik-region-picker',
        customElement: true,
        events: [{ name: 'selectionChanged' }],
        members: [
            field('disabled', 'boolean'),
            field('isDropDownOpen', 'boolean'),
            field('items', 'Array<TItem>'),
            field('selectedItem', 'TItem | null'),
            field('value', 'string | null'),
            field('placeholder', 'string'),
            open,
            method('close'),
        ],
    };
    const other = {
        name: 'OtherWidgetElement',
        tagName: 'mosaik-other-widget',
        customElement: true,
        members: [
            field('disabled', 'boolean'),
            { ...field('label', 'string'), readonly: true },
            { ...field('privateField', 'string'), privacy: 'private' },
            { ...method('staticMethod'), static: true },
        ],
    };

    return { schemaVersion: '1.0.0', modules: [{ declarations: [select] }, { declarations: [other] }] };
}

describe('renderMosaikAccessors', () => {
    it('generates independent accessors for previously unknown tags in stable order', () => {
        const manifest = createManifest();
        const output = renderMosaikAccessors(manifest);
        manifest.modules.reverse();
        for (const module of manifest.modules) {
            for (const declaration of module.declarations) declaration.members.reverse();
        }

        expect([...renderMosaikAccessors(manifest)]).toEqual([...output]);
        expect([...output.keys()]).toEqual(['other-widget', 'region-picker']);
        const picker = output.get('region-picker');
        expect(picker?.get('index.ts')).toContain("export { RegionPickerAccessor } from './RegionPickerAccessor.js'");
        expect(picker?.get('RegionPickerAccessor.ts')).toContain('class RegionPickerAccessor extends ElementAccessor');
        const other = output.get('other-widget')?.get('OtherWidgetAccessor.ts');
        expect(other).toContain('class OtherWidgetAccessor extends ElementAccessor');
        expect(other).toContain("@Accessor({\n    tagName: 'mosaik-other-widget'");
        expect(other).toContain("properties: ['disabled', 'label'],\n    readOnlyProperties: ['label'],");
        expect(other).not.toMatch(/privateField|staticMethod|region-picker/);
    });

    it('keeps the same accessor base when an element changes an interaction method signature', () => {
        const open = { ...method('open'), parameters: [{ name: 'trigger', type: { text: 'HTMLElement' } }] };
        const manifest = createManifest(open);

        const picker = renderMosaikAccessors(manifest).get('region-picker')?.get('RegionPickerAccessor.ts');
        expect(picker).toContain("methods: ['close', 'open']");
        expect(picker).toContain('class RegionPickerAccessor extends ElementAccessor');
    });
});
