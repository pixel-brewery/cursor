// #region Imports

import 'reflect-metadata';
import { ThemeService } from '@pixel-brewery/mosaik-elements-foundation';
import { ReiconAliases } from '@pixel-brewery/mosaik-elements-foundation/icons/reicon';
import { IconRegistry } from '@pixel-brewery/mosaik-icons';
import { SohoTheme } from '@pixel-brewery/mosaik-themes';
import { ReferenceView } from './views/ReferenceView.js';
import './styles.css';

// #endregion

ThemeService.instance.applyTheme(SohoTheme.SOHO_THEME);
IconRegistry.instance.registerSet('reicon', ReiconAliases);
IconRegistry.instance.setDefaultSet('reicon');
const host = window.cursorDesktop ? 'electron' : 'browser';
new ReferenceView(host);
