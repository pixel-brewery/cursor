// #region Imports

import { describe, expect, it } from 'vitest';
import { renderMosaikSelectBinding } from './renderMosaikSelectBinding.js';

// #endregion

function field(name: string, text: string) {
    return { kind: 'field', name, privacy: 'public', type: { text } };
}

function method(name: string) {
    return { kind: 'method', name, privacy: 'public', return: { type: { text: 'void' } } };
}

function createManifest(open = method('open')) {
    const select = {
        tagName: 'mosaik-select',
        customElement: true,
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
    const item = {
        tagName: 'mosaik-select-item',
        customElement: true,
        members: [field('disabled', 'boolean'), field('value', 'TType')],
    };

    return { schemaVersion: '1.0.0', modules: [{ declarations: [select] }, { declarations: [item] }] };
}

describe('renderMosaikSelectBinding', () => {
    it('projects only the required capabilities in a stable order', () => {
        const manifest = createManifest();
        const source = renderMosaikSelectBinding(manifest);
        manifest.modules.reverse();
        for (const module of manifest.modules) {
            for (const declaration of module.declarations) declaration.members.reverse();
        }

        expect(renderMosaikSelectBinding(manifest)).toBe(source);
        expect(source).toContain('readonly items: readonly IMosaikSelectItemElement[]');
        expect(source).not.toContain('placeholder');
    });

    it('rejects an operation that now needs a parameter', () => {
        const open = { ...method('open'), parameters: [{ name: 'trigger', type: { text: 'HTMLElement' } }] };
        const manifest = createManifest(open);

        expect(() => renderMosaikSelectBinding(manifest)).toThrow('mosaik-select.open');
    });
});
