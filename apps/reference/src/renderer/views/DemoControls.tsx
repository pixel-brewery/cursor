// #region Imports

import {
    DataTableElementIntl,
    SelectElementIntl,
    type IDataTableColumnDefinition,
} from '@pixel-brewery/mosaik-elements-foundation';
import type { JSX, Ref } from 'preact';
import { useState } from 'preact/hooks';

// #endregion

const tableRows = [
    { id: 'luebeck', name: 'Lübeck', region: 'Norden', revenue: 18400 },
    { id: 'freiburg', name: 'Freiburg', region: 'Süden', revenue: 21750 },
    { id: 'bonn', name: 'Bonn', region: 'Westen', revenue: 15300 },
    { id: 'kiel', name: 'Kiel', region: 'Norden', revenue: 12650 },
    { id: 'augsburg', name: 'Augsburg', region: 'Süden', revenue: 19600 },
    { id: 'muenster', name: 'Münster', region: 'Westen', revenue: 17250 },
];

const tableColumns: IDataTableColumnDefinition[] = [
    { key: 'name', title: 'Name' },
    { key: 'region', title: 'Region' },
    { key: 'revenue', title: 'Umsatz', type: 'currency', currency: 'EUR', formatOptions: { maximumFractionDigits: 0 } },
];

interface IDemoControlsProps {
    readonly tabsRef: Ref<HTMLElementTagNameMap['mosaik-tab']>;
    readonly regionRef: Ref<HTMLElementTagNameMap['mosaik-select']>;
    readonly tableRef: Ref<HTMLElementTagNameMap['mosaik-data-table']>;
    readonly checkboxRef: Ref<HTMLElementTagNameMap['mosaik-checkbox']>;
}

/**
 * Shows interactive Mosaik controls in native tab panels.
 *
 * @param props - References to the controls exposed to the host.
 * @returns The demo controls card.
 * @internal
 */
export function DemoControls(props: IDemoControlsProps): JSX.Element {
    const { tabsRef, regionRef, tableRef, checkboxRef } = props;
    const [regionIntl] = useState(() => {
        const intl = new SelectElementIntl('de');
        intl.toggleLabel = 'Regionen öffnen';
        return intl;
    });
    const [tableIntl] = useState(() => {
        const intl = new DataTableElementIntl();
        intl.locale = 'de';
        intl.columnMenuLabel = 'Spaltenoptionen für {column}';
        intl.sortAscendingLabel = 'Aufsteigend sortieren';
        intl.sortDescendingLabel = 'Absteigend sortieren';
        intl.clearSortingLabel = 'Sortierung aufheben';
        intl.groupByColumnLabel = 'Nach dieser Spalte gruppieren';
        intl.ungroupColumnLabel = 'Gruppierung aufheben';
        intl.groupCountLabel = '{count} Zeilen';
        intl.groupedByLabel = 'Gruppiert nach {column}';
        intl.removeGroupLabel = 'Gruppierung nach {column} entfernen';
        intl.expandAllGroupsLabel = 'Alle Gruppen aufklappen';
        intl.collapseAllGroupsLabel = 'Alle Gruppen zuklappen';
        intl.groupingLabel = 'Gruppierung';
        return intl;
    });

    return (
        <mosaik-card class="demo-controls" appearance="outline">
            <mosaik-card-header>
                <mosaik-card-title text="Steuerelemente" />
            </mosaik-card-header>
            <mosaik-card-content>
                <mosaik-tab ref={tabsRef} data-testid="demo-tabs" aria-label="Demo-Steuerelemente">
                    <mosaik-tab-item data-testid="demo-tab-selection" label="Auswahl" value="selection" isSelected>
                        <div class="demo-panel">
                            <mosaik-select
                                ref={regionRef}
                                class="demo-region"
                                data-testid="demo-region"
                                label="Region"
                                value="north"
                                intl={regionIntl}
                            >
                                <mosaik-select-item label="Norden" value="north" />
                                <mosaik-select-item label="Süden" value="south" />
                                <mosaik-select-item label="Westen" value="west" />
                            </mosaik-select>
                        </div>
                    </mosaik-tab-item>
                    <mosaik-tab-item data-testid="demo-tab-table" label="Tabelle" value="table">
                        <div class="demo-panel">
                            <mosaik-data-table
                                ref={tableRef}
                                data-testid="demo-table"
                                aria-label="Umsatz nach Standort"
                                columnDefinitions={tableColumns}
                                intl={tableIntl}
                                source={tableRows}
                                rowKey="id"
                                sortable
                                groupable
                            />
                        </div>
                    </mosaik-tab-item>
                    <mosaik-tab-item data-testid="demo-tab-options" label="Optionen" value="options">
                        <div class="demo-panel">
                            <mosaik-checkbox ref={checkboxRef} data-testid="demo-checkbox" label="Vorschau anzeigen" />
                        </div>
                    </mosaik-tab-item>
                </mosaik-tab>
            </mosaik-card-content>
        </mosaik-card>
    );
}
