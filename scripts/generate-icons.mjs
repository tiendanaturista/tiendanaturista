// Genera los íconos PNG de la PWA a partir de public/favicon.svg
// Uso: npm run icons   (usa "sharp", que ya viene instalado con Astro)
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';

const svg = await readFile('public/favicon.svg');
await mkdir('public/icons', { recursive: true });

const fondo = { r: 47, g: 107, b: 58, alpha: 1 }; // #2f6b3a

// Íconos normales
for (const [nombre, size] of [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(`public/icons/${nombre}`);
}

// Ícono "maskable": el logo ocupa ~70% para que no lo recorte Android
const logo = await sharp(svg, { density: 384 }).resize(358, 358).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: fondo } })
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toFile('public/icons/icon-maskable-512.png');

console.log('Íconos generados en public/icons/');
