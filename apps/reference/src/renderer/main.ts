// #region Imports

import 'reflect-metadata';
import { ThemeService } from '@pixel-brewery/mosaik-elements-foundation';
import { SohoTheme } from '@pixel-brewery/mosaik-themes';
import { ReferenceView } from './views/ReferenceView.js';
import './styles.css';

// #endregion

ThemeService.instance.applyTheme(SohoTheme.SOHO_THEME);
const host =
    new URLSearchParams(location.search).get('host') === 'electron' ? 'electron' : 'browser';
new ReferenceView(host);
