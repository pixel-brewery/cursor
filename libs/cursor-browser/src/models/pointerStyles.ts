const outlineShadow = 'drop-shadow(0 1px 1px #0003)';
const sharpArrow = 'polygon(0 0, 100% 45%, 56% 61%, 30% 100%)';
const keylineArrow = "path('M 0 0 L 17 8 L 9.8 10.3 L 5.4 18 Z')";
const keylineInset = "path('M 1.4 1.5 L 14.7 7.8 L 9.1 9.6 L 5.7 15.5 Z')";

/** CSS geometry for the four surface-local pointer styles. */
export const pointerStyles = {
    outline: {
        width: '12px',
        height: '14px',
        arrow: "path('M 0 0 L 12 6.2 L 6.4 7.8 L 2.8 14 Z')",
        inset: "path('M 1.2 1.5 L 9.6 5.9 L 5.8 7 L 3.2 11.3 Z')",
        shadow: outlineShadow,
        tipColor: '#101010',
        labelMargin: '12px 0 0 10px',
        labelRadius: '2px 999px 999px 999px',
        labelBorder: '1.5px solid var(--cursor-marker-border)',
        labelShadow: '0 3px 8px color-mix(in srgb, var(--cursor-marker-border) 18%, transparent)',
    },
    pill: {
        width: '16px',
        height: '17px',
        arrow: "path('M 0.5 2 Q 0 0 2 0.4 L 15 6.2 Q 17 7.6 14.7 8.8 L 9.3 10.8 L 6.1 16 Q 5.1 18 3.9 15.4 Z')",
        inset: undefined,
        shadow: 'none',
        tipColor: 'var(--cursor-marker-accent)',
        labelMargin: '13px 0 0 13px',
        labelRadius: '999px',
        labelBorder: '0',
        labelShadow: 'none',
    },
    square: {
        width: '18px',
        height: '19px',
        arrow: sharpArrow,
        inset: undefined,
        shadow: 'none',
        tipColor: 'var(--cursor-marker-accent)',
        labelMargin: '17px 0 0 16px',
        labelRadius: '0',
        labelBorder: '0',
        labelShadow: 'none',
    },
    'square-outline': {
        width: '17px',
        height: '18px',
        arrow: keylineArrow,
        inset: keylineInset,
        shadow: outlineShadow,
        tipColor: 'var(--cursor-marker-accent)',
        labelMargin: '16px 0 0 16px',
        labelRadius: '0',
        labelBorder: '0',
        labelShadow: 'none',
    },
} as const;
