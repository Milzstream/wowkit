import { PNG } from "pngjs";

/**
 * Turns a PNG into the bytes of a TGA (32 bit, uncompressed, rows bottom to top): the image format the game reads for an
 * addon's pictures. The picture is scaled to `width` by `height` (square when no height is given) by averaging the pixels
 * each new pixel covers, so a large PNG (512 px) becomes a smooth small icon (128 px). Both must be powers of two, as the
 * game wants.
 */
export function convertPngToTga(pngBytes: Buffer, width: number, height = width): Buffer {
    const source = PNG.sync.read(pngBytes);
    const scaleX = source.width / width;
    const scaleY = source.height / height;
    const header = Buffer.alloc(18);
    header[2] = 2;
    header.writeUInt16LE(width, 12);
    header.writeUInt16LE(height, 14);
    header[16] = 32;
    header[17] = 8;
    const body = Buffer.alloc(width * height * 4);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const [red, green, blue, alpha] = averageArea(source, x * scaleX, y * scaleY, scaleX, scaleY);
            // TGA rows start at the bottom, and its pixels are blue, green, red, alpha
            const out = ((height - 1 - y) * width + x) * 4;
            body[out] = blue;
            body[out + 1] = green;
            body[out + 2] = red;
            body[out + 3] = alpha;
        }
    }
    return Buffer.concat([header, body]);
}

/** The average colour of a rectangle of the picture; see-through pixels count less, as they should. */
function averageArea(picture: PNG, left: number, top: number, width: number, height: number): [number, number, number, number] {
    let red = 0;
    let green = 0;
    let blue = 0;
    let alpha = 0;
    let weight = 0;
    for (let y = Math.floor(top); y < Math.min(picture.height, Math.ceil(top + height)); y++) {
        const rowWeight = Math.min(y + 1, top + height) - Math.max(y, top);
        for (let x = Math.floor(left); x < Math.min(picture.width, Math.ceil(left + width)); x++) {
            const pixelWeight = rowWeight * (Math.min(x + 1, left + width) - Math.max(x, left));
            const at = (y * picture.width + x) * 4;
            const opacity = picture.data[at + 3]! / 255;
            red += picture.data[at]! * opacity * pixelWeight;
            green += picture.data[at + 1]! * opacity * pixelWeight;
            blue += picture.data[at + 2]! * opacity * pixelWeight;
            alpha += opacity * pixelWeight;
            weight += pixelWeight;
        }
    }
    if (alpha === 0) return [0, 0, 0, 0];
    return [Math.round(red / alpha), Math.round(green / alpha), Math.round(blue / alpha), Math.round((alpha / weight) * 255)];
}
