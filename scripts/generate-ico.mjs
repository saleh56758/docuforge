import fs from 'fs';
import path from 'path';

// Standard 16x16 / 32x32 minimal ICO binary header with embedded icon
// ICO header: 0, 0 (reserved), 1, 0 (image type 1 = ICO), 1, 0 (number of images = 1)
// Directory entry: width (32), height (32), colors (0), reserved (0), planes (1, 0), bpp (32, 0), size, offset
// We can use a 32x32 uncompressed BMP inside ICO
const width = 32;
const height = 32;
const bpp = 32;
const imageSize = width * height * 4 + 40; // 40 bytes BMP info header + pixel data
const offset = 6 + 16; // 6 byte ICO header + 16 byte directory entry
const totalSize = offset + imageSize;

const buffer = Buffer.alloc(totalSize);

// ICO Header
buffer.writeUInt16LE(0, 0); // reserved
buffer.writeUInt16LE(1, 2); // ICO type
buffer.writeUInt16LE(1, 4); // 1 image

// ICO Directory Entry
buffer.writeUInt8(width, 6);
buffer.writeUInt8(height, 7);
buffer.writeUInt8(0, 8); // color palette
buffer.writeUInt8(0, 9); // reserved
buffer.writeUInt16LE(1, 10); // color planes
buffer.writeUInt16LE(bpp, 12); // bits per pixel
buffer.writeUInt32LE(imageSize, 14); // image size in bytes
buffer.writeUInt32LE(offset, 18); // offset of BMP data

// BMP Info Header
const bmpOffset = offset;
buffer.writeUInt32LE(40, bmpOffset); // header size
buffer.writeInt32LE(width, bmpOffset + 4);
buffer.writeInt32LE(height * 2, bmpOffset + 8); // height * 2 for ICO (mask included)
buffer.writeUInt16LE(1, bmpOffset + 12); // planes
buffer.writeUInt16LE(bpp, bmpOffset + 14); // bits per pixel
buffer.writeUInt32LE(0, bmpOffset + 16); // compression (BI_RGB)
buffer.writeUInt32LE(width * height * 4, bmpOffset + 20); // image data size
buffer.writeInt32LE(0, bmpOffset + 24);
buffer.writeInt32LE(0, bmpOffset + 28);
buffer.writeUInt32LE(0, bmpOffset + 32);
buffer.writeUInt32LE(0, bmpOffset + 36);

// Fill pixels: Indigo #2563eb (BGRA: B=0xeb, G=0x63, R=0x25, A=0xff)
const pixelOffset = bmpOffset + 40;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = pixelOffset + (y * width + x) * 4;
    // Simple rounded border margin
    const dist = Math.hypot(x - 15.5, y - 15.5);
    if (dist <= 15) {
      buffer.writeUInt8(0xeb, idx);     // Blue
      buffer.writeUInt8(0x63, idx + 1); // Green
      buffer.writeUInt8(0x25, idx + 2); // Red
      buffer.writeUInt8(0xff, idx + 3); // Alpha
    } else {
      buffer.writeUInt32LE(0, idx);     // Transparent
    }
  }
}

fs.writeFileSync(path.resolve('./public/favicon.ico'), buffer);
console.log('Successfully generated public/favicon.ico (size:', buffer.length, 'bytes)');
