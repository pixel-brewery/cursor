import 'reflect-metadata';
import { ThemeService } from '@pixel-brewery/mosaik-elements-foundation/dist/Theming/ThemeService';
import '@pixel-brewery/mosaik-elements-foundation/dist/Controls/Components/Buttons/Anchor/AnchorElement';
import '@pixel-brewery/mosaik-elements-foundation/dist/Controls/Components/Buttons/Button/ButtonElement';
import '@pixel-brewery/mosaik-elements-foundation/dist/Controls/Components/Media/Image/ImageElement';
import '@pixel-brewery/mosaik-elements-foundation/dist/Controls/Components/Grouping/Card/CardElement';
import { SohoTheme } from '@pixel-brewery/mosaik-themes';

const soho = SohoTheme.SOHO_THEME;
ThemeService.instance.applyTheme({
    ...soho,
    scheme: {
        ...soho.scheme,
        light: { ...soho.scheme.light, background: '#fbf9f6', surface: '#f3ede7' },
    },
    palette: {
        ...soho.palette,
        light: {
            ...soho.palette.light,
            primary: {
                0: '#ffffff',
                50: '#e8f5f3',
                100: '#c5e8e4',
                200: '#a0d8d2',
                300: '#69b9b2',
                400: '#34948e',
                500: '#0b746f',
                600: '#075d5b',
                700: '#064c4d',
                800: '#053c3d',
                900: '#062c2e',
            },
        },
    },
});

for (const link of document.querySelectorAll('mosaik-button[data-href], mosaik-anchor[data-href]')) {
    link.href = link.dataset.href;
}

document.getElementById('brand-icon').src = document.querySelector('link[rel="icon"]').href;
document.getElementById('hero-art').src = new URL('assets/hero.webp', document.baseURI).href;
