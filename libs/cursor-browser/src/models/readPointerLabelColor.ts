const hexColor = /^#[\da-f]{6}$/iu;

/** Chooses a light or dark foreground for a host-supplied hexadecimal accent. */
export function readPointerLabelColor(color: string): string {
    if (!hexColor.test(color)) return '#fff';

    const channels = [1, 3, 5].map((offset) => {
        const value = Number.parseInt(color.slice(offset, offset + 2), 16) / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    const [red = 0, green = 0, blue = 0] = channels;
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    return luminance > 0.179 ? '#111' : '#fff';
}
