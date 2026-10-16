# Oferta Naturista

PWA hecha con [Astro](https://astro.build) para vender productos naturales con pedido por WhatsApp.

- **Dominio principal:** https://tiendanaturista.com
- **Dominio alternativo:** https://tiendanaturista.co (redirige al `.com`)
- **Hosting:** Cloudflare Pages · **Código:** GitHub

## Desarrollo local

```bash
npm install
npm run icons    # genera los PNG de la PWA desde public/favicon.svg
npm run dev      # http://localhost:4323
npm run build    # compila a dist/
npm run preview  # prueba el build (aquí sí funciona el service worker)
```

> El service worker solo se activa en el build (`npm run build && npm run preview`), no en `npm run dev`.

## Qué editar primero

| Archivo | Para qué |
| --- | --- |
| `src/data/site.ts` | Tu número de WhatsApp (`whatsapp`), correo y textos del sitio |
| `src/data/productos.json` | Catálogo: nombre, precio, precio anterior, categoría |
| `public/favicon.svg` | Logo. Después corre `npm run icons` para regenerar los íconos |
| `astro.config.mjs` | Nombre y colores de la PWA (manifest) |

Los productos incluidos son **de ejemplo**: reemplázalos por los reales.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Proyecto inicial Oferta Naturista"
git branch -M main
gh repo create tienda-naturista --private --source=. --push
```

(Sin `gh`: crea el repo vacío en github.com y usa `git remote add origin <url>` + `git push -u origin main`.)

## Desplegar en Cloudflare Pages

1. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** y elige el repo.
2. Configuración de build:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variable de entorno: `NODE_VERSION` = `22`
3. Cada `git push` a `main` despliega automáticamente.

## Dominios

1. En el proyecto de Pages: **Custom domains → Set up a custom domain** → `tiendanaturista.com` (y opcionalmente `www.tiendanaturista.com`).
2. Agrega también `tiendanaturista.co` como custom domain para que Cloudflare lo sirva.
3. Para que el `.co` redirija al `.com`: en la zona `tiendanaturista.co` → **Rules → Redirect Rules → Create rule**
   - Cuando: *Hostname equals* `tiendanaturista.co` (y `www.tiendanaturista.co`)
   - Entonces: *Dynamic* → `concat("https://tiendanaturista.com", http.request.uri.path)`, código **301**, conservar query string.
4. Si los dominios están registrados fuera de Cloudflare, cambia los *nameservers* a los que te indique Cloudflare al agregar cada zona.

La etiqueta `canonical` de cada página apunta siempre al `.com`, así Google no ve contenido duplicado.

## SEO y Google Search Console

- El usuario `@tiendanaturista` está en `src/data/site.ts` (`handle` y `redes`). Se muestra en el pie de página y se publica como datos estructurados (`schema.org/Organization` → `sameAs`) en todas las páginas. **Deja solo las redes que existan.**
- Si la propiedad de Search Console ya está verificada por **DNS** (propiedad de dominio), no hay que hacer nada más. Si la verificaste con la **etiqueta HTML**, pega el valor de `content` en `googleSiteVerification` (`site.ts`).
- El sitemap se genera solo en `https://tiendanaturista.com/sitemap-index.xml`: envíalo en Search Console → **Sitemaps**.
- Usa la propiedad del `.com` como principal. El `.co` redirige con 301 y cada página declara su `canonical` al `.com`; si quieres, agrega también el `.co` en Search Console para vigilarlo.

## Estructura

```
public/            favicon, íconos PWA, robots.txt, _headers (Cloudflare)
scripts/           generate-icons.mjs
src/
  components/      ProductCard.astro
  data/            site.ts, productos.json
  layouts/         Layout.astro (SEO, manifest, registro del service worker)
  pages/           index.astro, offline.astro
  styles/          global.css
```

## Siguientes pasos sugeridos

- Fotos reales de producto (en `public/productos/`) en lugar de emojis.
- Página por producto y filtro por categoría.
- Analítica (Cloudflare Web Analytics) y botón flotante de WhatsApp.
- Pasarela de pago (Wompi, Mercado Pago) si quieres cobrar en línea.
