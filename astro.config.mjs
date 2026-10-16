// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import sitemap from '@astrojs/sitemap';

// Dominio principal: tiendanaturista.com
// Dominio alternativo: tiendanaturista.co (se redirige al principal desde Cloudflare)
export default defineConfig({
  site: 'https://tiendanaturista.com',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/offline') }),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: false, // el registro se hace en src/layouts/Layout.astro
      manifest: {
        name: 'Oferta Naturista',
        short_name: 'Oferta Naturista',
        description:
          'Productos naturales y bienestar con las mejores ofertas. Pide fácil por WhatsApp.',
        lang: 'es-CO',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f6f1e7',
        theme_color: '#2f6b3a',
        categories: ['shopping', 'health'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,ico,webmanifest,txt}'],
        navigateFallback: '/offline/',
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
