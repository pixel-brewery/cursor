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
        expect([...output.keys()]).toEqual(['other-widget.ts', 'region-picker.ts']);
        expect(output.get('region-picker.ts')).toContain(', bindSingleChoice);');
        const other = output.get('other-widget.ts');
        expect(other).toContain('createMosaikAccessor("mosaik-other-widget"');
        expect(other).toContain('["disabled","label"],\n    ["label"],');
        expect(other).not.toMatch(/bindSingleChoice|privateField|staticMethod|region-picker/);
    });

    it('keeps the general accessor when a dropdown no longer supports the guided pattern', () => {
        const open = { ...method('open'), parameters: [{ name: 'trigger', type: { text: 'HTMLElement' } }] };
        const manifest = createManifest(open);

        const picker = renderMosaikAccessors(manifest).get('region-picker.ts');
        expect(picker).toContain('["close","open"]');
        expect(picker).not.toContain('bindSingleChoice');
    });
});
